var postgresArray = {};
var hasRequiredPostgresArray;
function requirePostgresArray() {
  if (hasRequiredPostgresArray) return postgresArray;
  hasRequiredPostgresArray = 1;
  const BACKSLASH = "\\";
  const DQUOT = '"';
  const LBRACE = "{";
  const RBRACE = "}";
  const LBRACKET = "[";
  const EQUALS = "=";
  const COMMA = ",";
  const NULL_STRING = "NULL";
  function makeParseArrayWithTransform(transform) {
    const haveTransform = transform != null;
    return function parseArray2(str) {
      const rbraceIndex = str.length - 1;
      if (rbraceIndex === 1) {
        return [];
      }
      if (str[rbraceIndex] !== RBRACE) {
        throw new Error("Invalid array text - must end with }");
      }
      let position = 0;
      if (str[position] === LBRACKET) {
        position = str.indexOf(EQUALS) + 1;
      }
      if (str[position++] !== LBRACE) {
        throw new Error("Invalid array text - must start with {");
      }
      const output = [];
      let current = output;
      const stack = [];
      let currentStringStart = position;
      let currentString = "";
      let expectValue = true;
      for (; position < rbraceIndex; ++position) {
        let char = str[position];
        if (char === DQUOT) {
          currentStringStart = ++position;
          let dquot = str.indexOf(DQUOT, currentStringStart);
          let backSlash = str.indexOf(BACKSLASH, currentStringStart);
          while (backSlash !== -1 && backSlash < dquot) {
            position = backSlash;
            const part2 = str.slice(currentStringStart, position);
            currentString += part2;
            currentStringStart = ++position;
            if (dquot === position++) {
              dquot = str.indexOf(DQUOT, position);
            }
            backSlash = str.indexOf(BACKSLASH, position);
          }
          position = dquot;
          const part = str.slice(currentStringStart, position);
          currentString += part;
          current.push(haveTransform ? transform(currentString) : currentString);
          currentString = "";
          expectValue = false;
        } else if (char === LBRACE) {
          const newArray = [];
          current.push(newArray);
          stack.push(current);
          current = newArray;
          currentStringStart = position + 1;
          expectValue = true;
        } else if (char === COMMA) {
          expectValue = true;
        } else if (char === RBRACE) {
          expectValue = false;
          const arr = stack.pop();
          if (arr === void 0) {
            throw new Error("Invalid array text - too many '}'");
          }
          current = arr;
        } else if (expectValue) {
          currentStringStart = position;
          while ((char = str[position]) !== COMMA && char !== RBRACE && position < rbraceIndex) {
            ++position;
          }
          const part = str.slice(currentStringStart, position--);
          current.push(
            part === NULL_STRING ? null : haveTransform ? transform(part) : part
          );
          expectValue = false;
        } else {
          throw new Error("Was expecting delimeter");
        }
      }
      return output;
    };
  }
  const parseArray = makeParseArrayWithTransform();
  postgresArray.parse = (source, transform) => transform != null ? makeParseArrayWithTransform(transform)(source) : parseArray(source);
  return postgresArray;
}
var postgresArrayExports = /* @__PURE__ */ requirePostgresArray();
export {
  postgresArrayExports as p
};
