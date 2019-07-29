/* eslint-disable */
import * as d3 from 'd3'

export default class BaseMap {
    constructor(el, opts) {
        this.d3Container = d3.selectAll(el)
        this.opts = opts
    }
    init() {
        d3.json(`./map/china.json`).then(geoJson => {
            this.createSVG()
            this.createMainGroup()
            this.createMapGroup()
            this.renderMap(geoJson)
        }, e => {
            reject(e)
        })
    }
    // 创建svg容器
    createSVG() {
        this.svg = d3.selectAll('svg')
        if (this.svg._groups && this.svg._groups[0][0]) {
            return
        }
        let zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", ()=> this.zoomed());
        this.svg = this.d3Container.append('svg')
            .attr('width', this.opts.width)
            .attr('height', this.opts.height)
            .call(zoom)
    }
    // 创建主g容器 ，用于缩放
    createMainGroup() {
        this.mainGroup = this.svg.selectAll('g.main-group')
        if (this.mainGroup._groups && this.mainGroup._groups[0][0]) {
            return
        }
        this.mainGroup = this.svg.append('g')
            .attr('class', 'main-group')
    }
    // 创建地图容器，存放地图相关path
    createMapGroup() {
        this.mapGroup = this.mainGroup.selectAll('g.map-group')
        if (this.mapGroup._groups && this.mapGroup._groups[0][0]) {
            return
        }
        this.mapGroup = this.mainGroup.append('g')
            .attr('class', 'map-group')
    }
    // 渲染地图
    renderMap(geoJson) {
        this.projection = d3.geoMercator().fitSize([this.opts.width - 10, this.opts.height - 10], geoJson);
        this.path = d3.geoPath()
            .projection(this.projection);
        this.mapGroup
            .selectAll('path')
            .data(geoJson.features)
            .enter()
            .append('g')
            .attr('class', 'path-group')
            .append('path')
            .attr('class', 'map-path')
            .attr('d', this.path)
        this.mapGroup.selectAll('.path-group')
            .append('text')
            .text(d=>{
                return d.properties.name
            })
            .attr('transform', d=>{
                if(!d.properties.center) return
                return `translate(${this.projection(d.properties.center)}),scale(0.8)`
            })
    }
    // 缩放
    zoomed() {
        let t = d3.event.transform;
        this.mainGroup.attr("transform", t);
        this.mainGroup.selectAll("circle.point")
            .transition()
            .duration(750)
            .attr("transform", function () {
                let curr = this.transform.baseVal[0].matrix;
                return "translate(" + curr.e + "," + curr.f + ")scale(" + 1 / t.k + ")";
            });
    }
}