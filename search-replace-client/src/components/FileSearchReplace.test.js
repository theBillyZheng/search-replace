import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import FileSearchReplace from "./FileSearchReplace";
import * as fileSearchReplaceAPI from "../api/FileSearchReplaceAPI";

const mockSearchReplaceData = {
    data: {
        occurrences: 2,
        search: 'search',
        replace: 'replace',
        fileName: 'fileName.txt'
    }
};


configure({adapter: new Adapter()});

it("renders with disabled button", () => {
    const wrapper = shallow(<FileSearchReplace />);
    expect(wrapper.find('button').props()['disabled']).toBe(true);
});

it("should enable button if form is filled", () => {
    const wrapper = shallow(<FileSearchReplace />);
    wrapper.find('input[type="file"]').simulate('change', {
        target: {
            files: [
                { name: 'dummyFile.txt' }
            ]   
        }
    });

    wrapper.find('#search-input').simulate('change', {
        target: {
            value: 'search'
        }
    });

    wrapper.find('#replace-input').simulate('change', {
        target: {
            value: 'replace'
        }
    });

    expect(wrapper.find('button').props()['disabled']).toBe(false);
});

it("should call api", () => {
    const wrapper = shallow(<FileSearchReplace />);
    wrapper.find('input[type="file"]').simulate('change', {
        target: {
            files: [
                { name: 'dummyFile.txt' }
            ]   
        }
    });

    wrapper.find('#search-input').simulate('change', {
        target: {
            value: 'search'
        }
    });

    wrapper.find('#replace-input').simulate('change', {
        target: {
            value: 'replace'
        }
    });

    const mockFileSearchReplace = jest.spyOn(fileSearchReplaceAPI, 'fileSearchReplace');
    mockFileSearchReplace.mockResolvedValue(mockSearchReplaceData);

    wrapper.find('button').simulate('click');

    expect(mockFileSearchReplace.mock.calls.length).toBe(1);
});