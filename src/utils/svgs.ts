import { Bodies, Svg, Vertices } from "matter-js";

Bodies.fromSvg = async (path: string, scale: number, ...a: Parameters<typeof Bodies.fromVertices>) => {
    var select = (root: any, selector: string) => Array.prototype.slice.call(root.querySelectorAll(selector));
    var loadSvg = (url: string) =>
        fetch(url)
            .then((response) => response.text())
            .then((raw) => new window.DOMParser().parseFromString(raw, "image/svg+xml"));

    const vertices = await loadSvg(path).then((root) =>
        select(root, "path").map((path) => Vertices.scale(Svg.pathToVertices(path, 100), scale, scale, { x: 0, y: 0 }))
    );

    // console.log(vertices);

    return Bodies.fromVertices(a[0], a[1], vertices, a[3], a[4]);
};
