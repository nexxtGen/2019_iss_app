import React from "react";
import DataContainerTwo from "../DataContainerTwo";
import { shallow, mount } from "enzyme";

describe("DataContainerTwo", () => {
  it("Renders without crashing", () => {
    expect(shallow(<DataContainerTwo />).isEmptyRender()).toBe(false);
  });

  describe("handlerBasicInfo func", () => {
    it("Should handlerBasicInfo function set state- information: 'basic'", () => {
      const component = mount(<DataContainerTwo />);
      component.instance().handlerBasicInfo();
      expect(component.state("information")).toBe("basic");
    });
  });

  describe("moreInfo func", () => {
    it("Should handlerMoreInfo function set state- information: 'more'", () => {
      const component = mount(<DataContainerTwo />);
      component.instance().handlerMoreInfo();
      expect(component.state("information")).toBe("more");
    });
  });

  describe("MoreInfoButton", () => {
    it("Should call moreInfoHandler on click", () => {
      const wrapper = mount(<DataContainerTwo />);
      const componentInstance = wrapper.instance();
      const func = componentInstance.handlerMoreInfo();
      const moreInfoBtn = wrapper.find('button[aria-label="more-info-btn"]');

      moreInfoBtn.simulate("click");

      expect(componentInstance.handlerMoreInfo()).toEqual("more");
    });
  });
});
