import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";

// Jak przekazać w wł funkcji inną funkcję z komponentu klasowego.
// Jak sprawdzić czy btn zwraca calla gdy funkcja nie jest przekazywana przez props, tylko intnieje w komponencie klasowym

describe("App component", () => {
  it("Renders without crashing", () => {
    expect(shallow(<App />).isEmptyRender()).toBe(false);
  });

  describe("getDistanceFromLatLonInKm", () => {
    it("Should getDistanceFromLatLonInKm function set state- distanceBetween: 'num'", () => {
      const component = mount(<App />);
      const deg2rad = component.instance().deg2rad;

      component
        .instance()
        .getDistanceFromLatLonInKm(50.6, 20.85, 16.85, 21.85, deg2rad);
      expect(component.state("distanceBetween")).toBe(4143.95);
    });
  });
});
