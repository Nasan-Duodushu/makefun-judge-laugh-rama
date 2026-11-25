// Make the AI Judge Laugh — entry program.
// Writes one office-life joke (1-200 chars, single line) to /output/entry.txt.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SETUP = "I asked HR for a raise.";
const PUNCH = "They gave me a pizza party and a poster that says 'We Are Family'.";

class OfficeJoke {
  readonly line: string;

  constructor(setup: string, punch: string) {
    this.line = `${setup} ${punch}`;
  }

  get length(): number {
    return Array.from(this.line).length;
  }

  private assertValid(): void {
    if (this.length < 1 || this.length > 200) {
      throw new Error(`joke is ${this.length} chars, outside the 1-200 gate`);
    }
    if (this.line.split("\n").length !== 1 || this.line.trim().length === 0) {
      throw new Error("joke must be exactly one non-empty line");
    }
  }

  deliver(): void {
    this.assertValid();
    if (!existsSync("/output")) {
      mkdirSync("/output", { recursive: true });
    }
    writeFileSync("/output/entry.txt", this.line, "utf8");
    const roundTrip = readFileSync("/output/entry.txt", "utf8");
    if (roundTrip !== this.line) {
      throw new Error("round-trip check failed: entry.txt does not match the joke");
    }
    console.log(`delivered ${this.length} chars to /output/entry.txt`);
  }
}

new OfficeJoke(SETUP, PUNCH).deliver();
