# gen-html

Convert JS objects to HTML

# Usage

# `htmlgen.convert(object, allowLiteralHTML)`

**Parameters**:
* `object`: The object to be converted. It may be an object, an array, or a string.
* `allowLiteralHTML`: Whether HTML tags within strings should be escaped or allowed to remain. **Default:** false

**Returns**:

If `object` is a string, this method returns the string unchanged (except angled brackets will be escaped as HTML entities if `allowLiteralHTML` is false). 

If `object` is an array, this method will convert each element of the array to HTML, returning the concatenated HTML.

If `object` is an object, this method will generate an HTML element. `object.tag` will be the element's tag name. Any keys on the object not named `tag`, `child` or `allowLiteralHTML` will be encoded as an attribute under the object. The generated element's contents will be `object.child`, which will be recursively converted to HTML using `.convert()`.

The `allowLiteralHTML` property on an object will override whatever was passed to `.convert()` if present.

# `htmlgen.createDocument(object)`

**Parameters**:
* `object`: The object to be converted.

This method is identical to `.convert()`, except it prepends `<!DOCTYPE html>` at the beginning of the result.

# Examples

```
genhtml.convert({
    tag: "html",
    lang: "en",
    child: [
        {tag: "head", child: [
            {tag: "title", child: "My Test Page"}
        ]},
        {tag: "body", child: [
            {tag: "h1", child: "Hello, world!"},
            {tag: "p", style: "color: red", child: "Here's some red text."},
            {tag: "p", child: "<script>alert('hacked')</script>"},
            {tag: "p", allowLiteralHTML: true, child: "<b>This will make it through.</b>"}
        ]}
    ]
});

// This yields:
// <html lang="en">
//     <head>
//         <title>My Test Page</title>
//     </head>
//     <body>
//         <h1>Hello, world!</h1>
//          <p style="color: red">Here's some red text.</p>
//          <p>&lt;script&gt;alert('hacked')&lt;/script&gt;</p>
//          <p><b>This will make it through.</b></p>
//     </body>
// </html>
```
