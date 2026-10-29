import { front, s1 } from "./local/part1";
import { s2 } from "./local/part2";
import { s3, back, appendix, references } from "./local/part3";

const paper = { ...front, sections: [...s1, ...s2, ...s3], back, appendix, references };
export default paper;
