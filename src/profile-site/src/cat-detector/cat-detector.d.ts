export interface CatDetector {
    startCamera():void;
    getCurrentDetections(): [];
  }
export interface DetectedObject {
  label: string,
  confidence: number,
  width: number,
  height: number
}
  
declare const catdetector: CatDetector;
export default catdetector;  