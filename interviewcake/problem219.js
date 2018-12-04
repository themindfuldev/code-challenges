/*
Given an undirected graph with maximum degree DD, find a graph coloring using at most D+1D+1 colors.

Graphs are represented by an array of NN node objects, each with a label, a set of neighbors, and a color:

  function GraphNode(label) {
    this.label = label;
    this.neighbors = new Set();
    this.color = null;
}

var a = new GraphNode("a");
var b = new GraphNode("b");
var c = new GraphNode("c");

a.neighbors.add(b);
b.neighbors.add(a);
c.neighbors.add(b);
b.neighbors.add(c);

var graph = [a, b, c];
*/

function GraphNode(label) {
    this.label = label;
    this.neighbors = new Set();
    this.color = null;
}

function getRandomColor(colorsCount, exclusionsVector = 0) {
    const exclusions = exclusionsVector.toString(2).split('');

    for (let i = colorsCount - 1; i--; i >= 0) {
        if (exclusions[i] === '0') {
            return colorsCount - 1 - i;
        }
    }

    return undefined;
}

function colorGraph(graph, allColors) {

    // Determine D
    const d = Math.max(...graph.map(node => node.neighbors.size)) + 1;
    const colors = d + 1;

    graph.forEach(node => {
        if (!node.color) {
            node.color = getRandomColor(colors);
        }
        let neighborExcludedColors = 1 << node.color;
        node.neighbors.forEach(neighbor => {
            if (!neighbor.color || neighbor.color === node.color) {
                neighbor.color = getRandomColor(colors, neighborExcludedColors);
            }
            if (neighbor.color) {
                neighborExcludedColors |= 1 << neighbor.color;
            }
            else {
                throw new Error('impossible to color graph');
            }
        });
    });

    graph.forEach(node => node.color = allColors[node.color]);
}

const CSS_COLOR_NAMES = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];

(function firstTest() {
    var a = new GraphNode("a");
    var b = new GraphNode("b");
    var c = new GraphNode("c");

    a.neighbors.add(b);
    b.neighbors.add(a);
    c.neighbors.add(b);
    b.neighbors.add(c);

    var graph = [a, b, c];

    colorGraph(graph, CSS_COLOR_NAMES);

    console.log(graph);
})();


(function lineGraphTest() {
    const nodeA = new GraphNode("A");
    const nodeB = new GraphNode("B");
    const nodeC = new GraphNode("C");
    const nodeD = new GraphNode("D");
    nodeA.neighbors.add(nodeB);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeC.neighbors.add(nodeB);
    nodeC.neighbors.add(nodeD);
    nodeD.neighbors.add(nodeC);
    const graph = [nodeA, nodeB, nodeC, nodeD];
    colorGraph(graph, CSS_COLOR_NAMES);
    console.log(graph);
})();



(function separateGraphTest() {
    const nodeA = new GraphNode("A");
    const nodeB = new GraphNode("B");
    const nodeC = new GraphNode("C");
    const nodeD = new GraphNode("D");
    nodeA.neighbors.add(nodeB);
    nodeB.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeD);
    nodeD.neighbors.add(nodeC);
    const graph = [nodeA, nodeB, nodeC, nodeD];
    colorGraph(graph, CSS_COLOR_NAMES);
    console.log(graph);
})();



(function triangleGraphTest() {
    const nodeA = new GraphNode("A");
    const nodeB = new GraphNode("B");
    const nodeC = new GraphNode("C");
    nodeA.neighbors.add(nodeB);
    nodeA.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeC.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeB);
    const graph = [nodeA, nodeB, nodeC];
    colorGraph(graph, CSS_COLOR_NAMES);
    console.log(graph);
})();

(function envelopeGraphTest() {
    const nodeA = new GraphNode("A");
    const nodeB = new GraphNode("B");
    const nodeC = new GraphNode("C");
    const nodeD = new GraphNode("D");
    const nodeE = new GraphNode("E");
    nodeA.neighbors.add(nodeB);
    nodeA.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeD);
    nodeB.neighbors.add(nodeE);
    nodeC.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeB);
    nodeC.neighbors.add(nodeD);
    nodeC.neighbors.add(nodeE);
    nodeD.neighbors.add(nodeB);
    nodeD.neighbors.add(nodeC);
    nodeD.neighbors.add(nodeE);
    nodeE.neighbors.add(nodeB);
    nodeE.neighbors.add(nodeC);
    nodeE.neighbors.add(nodeD);
    const graph = [nodeA, nodeB, nodeC, nodeD, nodeE];
    colorGraph(graph, CSS_COLOR_NAMES);
    console.log(graph);
})();



(function loopGraphTest() {
    const nodeA = new GraphNode("A");
    nodeA.neighbors.add(nodeA);
    const graph = [nodeA];
    colorGraph(graph, CSS_COLOR_NAMES);
    console.log(graph);
})();


