// tslint:disable-next-line:no-implicit-dependencies
import Enzyme, { mount, shallow } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
// tslint:disable-next-line:no-implicit-dependencies
import { fireEvent, getByTestId, render } from "react-testing-library";
import App from "./App";
import AddUserForm from "./components/AddUserForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("App works", () => {
  const { container } = render(<App />);
  const wrapper = shallow(<App />);
  const query = container.querySelector(".app");
  console.log(wrapper);

  console.log(query.textContent);
});

// // Takes the context data we want to test, or uses defaults
// const getLanguageSelectorWithContext = (context = {languages: ['en', 'fr', 'es'], activeLanguage: 'en'}) => {

//   // Will then mock the LocalizeContext module being used in our LanguageSelector component
//   jest.doMock('./LocalizeContext', () => {
//     return {
//       LocalizeContext: {
//         Consumer: (props) => props.children(context)
//       }
//     }
//   });

//   // you need to re-require after calling jest.doMock.
//   // return the updated LanguageSelector module that now includes the mocked context
//   return require('./LanguageSelector').LanguageSelector;
// };
