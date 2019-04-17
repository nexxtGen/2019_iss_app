import React from "react";
import { shallow } from "enzyme";
import DataContainerOne from "../DataContainerOne";

describe("DataContainerOne", () => {
  it("Should render without crash", () => {
    expect(shallow(<DataContainerOne />).isEmptyRender()).toBe(false);
  });

  describe("Reset button", () => {
    it("Should call reset track on click", () => {
      const mockedResetTracking = jest.fn(); //Metoda do mockowania, symuluje callback przekazany w propsach.
      const playerComponent = shallow(
        <DataContainerOne resetTracking={mockedResetTracking} />
      );

      const resetTrackingBtn = playerComponent.find(
        'button[aria-label="Reset"]'
      );

      resetTrackingBtn.simulate("click");

      expect(mockedResetTracking).toBeCalled();
    });
  });
});
