// Convert an object to HTML
// See https://www.w3.org/TR/2011/WD-html-markup-20110113/syntax.html

const voidElements = [
    "area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"
];

const escapeHTML = text => text.replace(/>/g, "&gt;").replace(/</g, "&lt;");
const escapeQuotes = text => text.replace(/"/g, "&quot;").replace(/\\/g, "&bsol;");
const createDocument = document => "<!DOCTYPE html>" + convertTag(document);

// Convert single element
const convertTag = (object, allowLiteralHTML) => {

    if(typeof object === "string") {
        return allowLiteralHTML ? object : escapeHTML(object);
    }
    
    if(Array.isArray(object)) {
        return object.map(elem => convertTag(elem, allowLiteralHTML)).join("");
    }

    if(typeof object !== "object" || object == null) {
        throw new Error(`Can't convert a ${typeof object} to HTML`);
    }

    if(!object.tag) throw new Error("Object has no tag");
    const openTag = `<${[object.tag, ...Object.keys(object).filter(attr => !["tag", "child", "allowLiteralHTML"].includes(attr)).map(attr => object[attr] ? `${attr}="${escapeQuotes(String(object[attr]))}"` : attr)].join(" ")}>`;

    if(voidElements.includes(object.tag)) {
       return openTag; 
    }

    return openTag + (object.child ? convertTag(object.child, object.allowLiteralHTML ?? allowLiteralHTML) : "") + `</${object.tag}>`;

};

module.exports = {
    createDocument: createDocument,
    convert: convertTag
};