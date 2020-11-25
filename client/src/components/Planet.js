import React, { Component } from "react";

class Planet extends Component {
  render() {
    const { planet } = this.props;
    return (
      <div className="col s12">
        <div className="card bg-info text-white">
          <div className="card-body">
            <h2 className="header">{planet.name}</h2>
            <div className="card-stacked">
              <div className="card-content">
                <p>
                  {planet.name} has a diameter of {planet.diameter} and garvity
                  of {planet.gravity}. This planet has terrain of {planet.terrain}.
                </p>
              </div>
              <div className="card-action">
                <span>
                  Total Population: <b>{planet.population}</b>
                </span>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Planet;
