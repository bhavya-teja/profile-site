const MAX_WIDTH = 1280;
const FOCAL_LENGTH = 1430;
const DFOV = Math.PI / 3;

const parameter = (location.search.split('distanceMethod=')[1] || '').split('&')[0]
const distanceMethod = parameter ? parameter  : 0;
const DEFAULT_DISTANCE = 0.5;

const IRIS_SIZE = 0.0117;
const NUM_KEYPOINTS = 468;
const NUM_IRIS_KEYPOINTS = 5;
const SMOOTHING = 0;

const HALF_DIAGONAL = 0.2;

const parameter2 = (location.search.split('blaze=')[1] || '').split('&')[0]
const BLAZE = (parameter2.length > 0);

let model: { estimateFaces: (arg0: { input: any; predictIrises: boolean; flipHorizontal: boolean; }, arg1: boolean | undefined) => any; }, HFOV: number, VFOV: number;
let canvas: HTMLCanvasElement, video: Element | null;
let width: number, height: number;

function distance(a: number[], b: number[]) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

function fov(dfov: number, w: number, h: number) {
    const hypothenuse = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
    const tan_dfov = Math.tan(dfov / 2);
    return [2 * Math.atan(w * tan_dfov / hypothenuse), 2 * Math.atan(h * tan_dfov / hypothenuse)];
}

async function getLocation(ctx: { getImageData: (arg0: number, arg1: number, arg2: any, arg3: any) => any; }, width: number, height: number) {
    let predictions;
    var distanceMethodNum = distanceMethod as number;
    if (BLAZE) {
        predictions = await model.estimateFaces(ctx.getImageData(0, 0, width, height), false);
    } else {
        predictions = await model.estimateFaces({
            input: ctx.getImageData(0, 0, width, height),
            predictIrises: (distanceMethodNum == 1),
            flipHorizontal: false
        }, false);
    }
    let centerX, centerY, keypoints, foreheadX, foreheadY;
    if (predictions.length > 0) {
        if (BLAZE) {
            centerX = (predictions[0].landmarks[0][0] + predictions[0].landmarks[1][0])/2;
            centerY = (predictions[0].landmarks[0][1] + predictions[0].landmarks[1][1])/2;
        } else {
            keypoints = predictions[0].scaledMesh;
            centerX = keypoints[168][0];
            centerY = keypoints[168][1];
    
            foreheadX = keypoints[10][0];
            foreheadY = keypoints[10][1];
        }
        let d;
        if (distanceMethodNum == 0) {
            d = DEFAULT_DISTANCE;
        } else if (distanceMethodNum == 2) {
            d = 0.06 * FOCAL_LENGTH * canvas.width / MAX_WIDTH / Math.sqrt(Math.pow(centerX - foreheadX, 2) + Math.pow(centerY - foreheadY, 2));
        } else if (keypoints.length > NUM_KEYPOINTS) {
            const leftDiameterY = distance(
                keypoints[NUM_KEYPOINTS + 4],
                keypoints[NUM_KEYPOINTS + 2]);
            const leftDiameterX = distance(
                keypoints[NUM_KEYPOINTS + 3],
                keypoints[NUM_KEYPOINTS + 1]);
            let diameter = Math.max(leftDiameterX, leftDiameterY);

            if (keypoints.length > NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS) {
                const rightDiameterY = distance(
                    keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 2],
                    keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 4]);
                const rightDiameterX = distance(
                    keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 3],
                    keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 1]);
                diameter = Math.max(diameter, rightDiameterX, rightDiameterY);
            }
            d = IRIS_SIZE * FOCAL_LENGTH * canvas.width / MAX_WIDTH / diameter;
        }
        return [Math.atan(2 * (centerX - width / 2) / width * Math.tan(HFOV / 2)),
            Math.atan(2 * (centerY - height / 2) / height * Math.tan(VFOV / 2)),
            d
        ]

    }
    return null;
}