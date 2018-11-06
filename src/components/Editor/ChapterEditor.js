import React, {Component} from 'react';
import {Divider} from 'antd';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js'

import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import createMentionPlugin from 'draft-js-mention-plugin';
import Editor from 'draft-js-plugins-editor';
import 'draft-js-mention-plugin/lib/plugin.css';

import { defaultTheme } from 'draft-js-mention-plugin'


import Search from "./Search";
import photoComponent from './Plugins/Photo/Component';
import PhotoEntry from './Plugins/Photo/Entry';

import chapterEditorStyles from './ChapterEditor.less';

import editorStyles from './editorStyles.less';
import buttonStyles from './buttonStyles.less';
import toolbarStyles from './toolbarStyles.less';

const raw = {"blocks": [{"key": "e4brl", "data": {}, "text": "The Pass and Wondferful Roman Early Church ", "type": "unstyled", "depth": 0, "entityRanges": [{"key": 0, "length": 8, "offset": 0}, {"key": 1, "length": 29, "offset": 13}], "inlineStyleRanges": []}], "entityMap": {"0": {"data": {"mention": {"url": "https://picsum.photos/512/512/?image=1051", "name": "The Pass", "latitude": 25.06334876641631, "longitude": 121.6330941952765}}, "type": "@Bmention", "mutability": "SEGMENTED"}, "1": {"data": {"mention": {"url": "https://picsum.photos/512/512/?image=1052", "name": "Wondferful Roman Early Church", "latitude": 25.06134876641631, "longitude": 121.6320941952765}}, "type": "@Bmention", "mutability": "SEGMENTED"}}};



export default class ChapterEditor extends Component {

  static defaultProps = {
    showImage : (e) => {alert(1)},
    updateChapter : (e) => {console.log(e)}
   }

  constructor(props) {
    super(props);

    this.mySaveFunction = (editorState) => {


      this.props.chapter.description = ( ( convertToRaw( editorState.getCurrentContent()) ));
      this.props.updateChapter(this.props.chapter);

      this.setState({saving : true});

      setTimeout((x) => {
        this.setState({saving : false});
      }, 500)

    };

    const config = {
      saveFunction: this.mySaveFunction,
      debounceTime: 400,
      saveAlways: false
    };

    this.mediaSearch = () => {
      this.setState({photos: [{id : 1, url : 'https://via.placeholder.com/150'}, {id : 2, url : 'https://via.placeholder.com/150'}] });
    }

    this.photoPlugin = createMentionPlugin(
      {
        mentionTrigger: '@',
        mentionComponent: photoComponent(this.props.showImage),
        theme : defaultTheme
      }
    );

    this.toolbarPlugin = createToolbarPlugin({

      theme: {buttonStyles, toolbarStyles},

      structure: [
      ]
    });

  }

  state = {
    photos : [],
    editorState:  EditorState.createEmpty(),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {

    const { chapter, newChapter } = this.props;
    const { editorState, saving, photos } = this.state;
    const {Toolbar} = this.toolbarPlugin;

    const PhotoSuggestions  = this.photoPlugin.MentionSuggestions;

    return (

      <div>

          <Editor
            readOnly={false}
            editorState={editorState}
            onChange={this.onChange}
            plugins={[ this.toolbarPlugin, this.photoPlugin ]}
            ref={(element) => {
              this.editor = element;
            }}
          />

        <div className={chapterEditorStyles.chaptorEditor}>
              <PhotoSuggestions
                key={1}
                entryComponent={PhotoEntry}
                onSearchChange={this.mediaSearch}
                suggestions={photos}
                onClose={() => this.setState({photos: []})}
              />
          </div>
          {saving && <span>Saving</span>}

          <Divider/>


      </div>
    );
  }
}
