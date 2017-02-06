// import {Program} from "./runtime/dsl";
// import {Watcher} from "./watchers/watcher";
// import "./watchers/html";

// let prog = new Program("test");
// Watcher.attach("html", prog);

// prog
//   .block("simple block", ({find, record, lib}) => {
//     let person = find("P");
//     let potato = find("potato");
//     let nameElem;
//     let personElem;
//     let name = "child" + "ren";
//     return [
//       nameElem = record("html/element", {tagname: "span", text: person.name}),
//       personElem = record("html/element", {tagname: "div", person, children: [nameElem]}),
//       record("html/element", {tagname: "section", potato}).add(name, personElem)
//     ]
//   });

// // prog.test(0, [
// //   [2, "tag", "html/element"],
// //   [2, "tagname", "div"],
// //   [2, "children", 3],

// //   [3, "tag", "html/element"],
// //   [3, "tagname", "span"],
// //   [3, "text", "Woo hoo!"],
// //   [3, "style", 4],

// //   [4, "color", "red"],
// //   [4, "background", "pink"],

// //   [5, "tag", "html/element"],
// //   [5, "tagname", "div"],
// //   [5, "style", 6],
// //   [5, "children", 7],

// //   [6, "border", "3px solid green"],

// //   [7, "tag", "html/element"],
// //   [7, "tagname", "span"],
// //   [7, "text", "meep moop"]
// // ]);

// prog
//   .test(0, [
//     [1, "tag", "P"],
//     [1, "name", "Jeff"],
//     [1, "age", 3],

//     [2, "tag", "P"],
//     [2, "name", "KERY"],
//     [2, "age", 17],

//     // [3, "tag", "P"],
//     // [3, "name", "RAB"],
//     // [3, "age", 87],

//     [4, "tag", "potato"],
//     [4, "kind", "idaho"],

//     // [5, "tag", "potato"],
//     // [5, "kind", "irish gold"],

//   ]);

// console.log("#############################################################");
// prog
//   .test(1, [
//     [1, "tag", "P", 0, -1],
//     //[3, "tag", "P", 0, -1]
//   ]);

// // console.log(prog);

// console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

// prog
//   .test(2, [
//     [1, "tag", "P", 0, 1],
//   ]);



import {Program} from "./runtime/dsl";
import {Watcher} from "./watchers/watcher";
import "./watchers/html";

let prog = new Program("test");
//Watcher.attach("html", prog);

prog
  .block("simple block", ({find, record, lib}) => {
    let person = find("P");
    let potato = find("potato");
    let nameElem;
    return [
      nameElem = record("E", {tagname: "floopy", text: person.name}),
      record("E", {tagname: "section", potato}).add("children", nameElem)
    ]
  })
  .block("Elements with no parents are roots.", ({find, record, lib, not}) => {
    let elem = find("E");
    not(({find}) => {
      find("E", {children: elem});
    });
    return [
      record("R", "I", {element: elem, tagname: elem.tagname})
    ];
  })
  .block("Create an instance for each child of a rooted parent.", ({find, record, lib, not}) => {
    let elem = find("E");
    let parentElem = find("E", {children: elem});
    let parent = find("I", {element: parentElem});

    return [
      record("I", {element: elem, tagname: elem.tagname, parent})
    ];
  });

prog
  .test(0, [
    [1, "tag", "P"],
    [1, "name", "Jeff"],

    [2, "tag", "P"],
    [2, "name", "KERY"],

    [3, "tag", "potato"],
  ]);

console.log(prog);
