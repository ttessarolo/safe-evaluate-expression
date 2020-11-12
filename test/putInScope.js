const test = require("ava");
const { putInScope, operators } = require("../");

//console.log(putInScope(operators));

const expected = `const isUndefined = x=>{cov_1kpu34pmd().f[0]++;cov_1kpu34pmd().s[1]++;return x===undefined;};
const isNull = x=>{cov_1kpu34pmd().f[1]++;cov_1kpu34pmd().s[2]++;return x===null;};
const isEmpty = x=>{cov_1kpu34pmd().f[2]++;cov_1kpu34pmd().s[3]++;return(cov_1kpu34pmd().b[0][0]++,x===undefined)||(cov_1kpu34pmd().b[0][1]++,x===null)||(cov_1kpu34pmd().b[0][2]++,typeof x==="string")&&(cov_1kpu34pmd().b[0][3]++,x.trim().length===0)||(cov_1kpu34pmd().b[0][4]++,typeof x==="number")&&(cov_1kpu34pmd().b[0][5]++,isNaN(x))||(cov_1kpu34pmd().b[0][6]++,typeof x==="object")&&(cov_1kpu34pmd().b[0][7]++,Object.keys(x).length===0);};
const isEqual = (a,b)=>{cov_1kpu34pmd().f[3]++;cov_1kpu34pmd().s[4]++;return a==b;};
const isDeepEqual = (a,b)=>{cov_1kpu34pmd().f[4]++;cov_1kpu34pmd().s[5]++;return a===b;};
const isGreater = (a,b)=>{cov_1kpu34pmd().f[5]++;cov_1kpu34pmd().s[6]++;return a>b;};
const isLower = (a,b)=>{cov_1kpu34pmd().f[6]++;cov_1kpu34pmd().s[7]++;return a<b;};
const isGreaterEqualThan = (a,b)=>{cov_1kpu34pmd().f[7]++;cov_1kpu34pmd().s[8]++;return Number(a)>=Number(b);};
const isLessEqualThan = (a,b)=>{cov_1kpu34pmd().f[8]++;cov_1kpu34pmd().s[9]++;return Number(a)<=Number(b);};`;

test("operators are in scope", (t) => t.is(putInScope(operators), expected));
