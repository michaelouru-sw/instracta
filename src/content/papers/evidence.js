import { front, s1 } from "./evidence/part1";
import { s2 } from "./evidence/part2";
import { s3, back, appendix, references } from "./evidence/part3";

const paper = { ...front, sections: [...s1, ...s2, ...s3], back, appendix, references };
export default paper;
