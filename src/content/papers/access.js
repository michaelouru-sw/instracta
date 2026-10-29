import { front, s1 } from "./access/part1";
import { s2 } from "./access/part2";
import { s3, back, appendix, references } from "./access/part3";

const paper = { ...front, sections: [...s1, ...s2, ...s3], back, appendix, references };
export default paper;
