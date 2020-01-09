import React, { Component } from 'react'
import UploadeDocument from './UploadDocument';

class DocComponent extends Component {
  // constructor(props) {
  //     super(props)
  //
  // }
    render(){
      const data = this.props.data;
      var listItems = '';
      let form;
      if (data){
        listItems = data.map((d) =>
        <li key={d.id}>{d.title}
        <a href={d.document_path} rel="noopener noreferrer" target="_blank" >CLick </a>
        </li>
      );
      form = <UploadeDocument />

      console.log('here', listItems);

    }

      return(
        <div>
      {listItems}
      <br/>
      {form}

      </div>

      );
}
}
export default DocComponent
