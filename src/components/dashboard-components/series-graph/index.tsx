import { Chart } from "chart.js"
import React, { Component, ReactNode } from "react"

import openInNew from "../../../assets/icons/open_in_new.svg"
import moreH from "../../../assets/icons/more_h.svg"

const labels = [1, 2, 3, 4, 5, 6, 7]
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
}

export class SeriesGraph extends Component {
  graph
  componentDidMount() {
    this.renderGraph()
  }
  componentDidUpdate() {
    this.renderGraph()
  }
  buildGraph() {
    const stackedLine = new Chart('graph-anchor', {
      type: 'line',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            }
          },
          y: {
            suggestedMin: 40,
            suggestedMax: 90,
            ticks: {
              stepSize: 20
            },
            grid: {
              drawBorder: false
            }
          }
        }
      }
    })
    return stackedLine
  }
  renderGraph() {
    if (!this.graph) {
      this.graph = this.buildGraph()
    } else {
      this.graph.destroy()
      this.graph = this.buildGraph()
    }
  }
  render(): ReactNode {
    return (
      <section className="registry-history-line-graph-container">
        <header className="activity-header">
          <div className="total-registries-histogram-header-title-and-open-view">
            <h2 className="activity-header-title"><b>History</b></h2>
            <img className="total-registries-histogram-header-open-view" src={openInNew} />
          </div>
          <img className="total-registries-histogram-header-more-view" src={moreH} />
        </header>
        <div className="canvas-wrapper">
          <canvas id="graph-anchor">
          </canvas>
        </div>
      </section>
    )
  }
}
