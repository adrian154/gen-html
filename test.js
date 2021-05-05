console.log(require("./index.js").convert({
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
}));