/// <reference path="../typings/mocha.d.ts" />
/// <reference path="../typings/chai.d.ts" />

/* tslint:disable:quotemark */
/* tslint:disable:no-multiline-string */
import * as chai from 'chai';
import {TestHelper} from './TestHelper';
import {Formatter} from '../src/fixNoVarKeywordFormatter';

class FixNoVarKeywordFormatterForTesting extends Formatter {

    private input: string;
    private output: string;

    constructor(input: string) {
        super();
        this.input = input;
    }

    public getOutput(): string {
        return this.output;
    }

    protected readFile(fileName: string): string {
        return this.input;
    }

    protected writeFile(fileName: string, fileContents: string): void {
        this.output = fileContents;
    }
}

/**
 * Unit tests.
 */
describe('fixNoVarKeywordFormatter', () : void => {

    const ruleName : string = 'no-var-keyword';

    it('should fix a var keyword', () : void => {
        const input : string = `
var foo = bar;
`;

        const formatter = new FixNoVarKeywordFormatterForTesting(input);
        formatter.format(TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput()).to.equal(
            `
let foo = bar;
`);
    });

    it('should fix a var keyword with no proceeding carriage return', () : void => {
        const input : string = `var foo = bar;
`;

        const formatter = new FixNoVarKeywordFormatterForTesting(input);
        formatter.format(TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput()).to.equal(
            `let foo = bar;
`);
    });

    it('should fix a var keyword with multiple proceeding carriage returns', () : void => {
        const input : string = `


var foo = bar;
`;

        const formatter = new FixNoVarKeywordFormatterForTesting(input);
        formatter.format(TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput()).to.equal(
            `


let foo = bar;
`);
    });

    it('should fix a var keyword with windows line endings', () : void => {
        const input : string = `\r\nvar foo = bar;\r\n`;

        const formatter = new FixNoVarKeywordFormatterForTesting(input);
        formatter.format(TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput()).to.equal(`\r\nlet foo = bar;\r\n`);
    });

    it('should fix a var keyword with multiple windows line endings', () : void => {
        const input : string = `\r\n    var foo = bar;\r\n`;

        const formatter = new FixNoVarKeywordFormatterForTesting(input);
        formatter.format(TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput()).to.equal(`\r\n    let foo = bar;\r\n`);
    });
});
/* tslint:enable:quotemark */
/* tslint:enable:no-multiline-string */
