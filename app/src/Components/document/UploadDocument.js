import React, { Component } from 'react'
import Axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const customHeaders = {
  'content-type': 'application/json',
  'Accept' : 'application/json',
  'Authorization' : 'Token ' + cookies.get('token')

};

const base_url = window.SERVER_ADDRESS

class UploadeDocument extends Component {

  constructor(props) {
      super(props)

      this.state = {
          document_path : null,
          title : '',
      }

  }

  isValid = () => {
      let valid = true;
      Object.values(this.state).forEach((val) => {
              if(val === true){
                  valid = false
                  return valid
              }
      })
      return valid;
  }

  clearForm = () => {
      this.setState({
              document_path : null,
              title : '',

      })
  }

  handleFileChange = (e) => {
      this.setState({
        document_path: e.target.files[0]
      })
    };

  uploadeDocument = e => {
      e.preventDefault()
      const {title, document_path} = this.state
      const formData = new FormData();
      formData.append('title', this.state.title)
      formData.append('document_path', this.state.document_path)
      formData.append('users', cookies.get('users'))

      const data =  {
          'title' : title,
          'document_path' : document_path,
          'users' :  cookies.get('users'),
        }

        console.log('data', this.state.document_path)
      // if(this.isValid()){
        // fetch(base_url + 'api/v1/document/', {
        //   crossDomain : true,
        //   withCredentials : true,
        //   async : true,
        //   method : 'POST',
        //   headers : {
        //     Authorization : `Token ${cookies.get('token')}`,
        //     'Content-Type':'multipart/form-data',
        //   },
        //   data: formData
        //   // data : JSON.stringify(data)
        //
        // })
        // .then(res => res.json())
        // .then(resp => {
        //   const docs = resp.results.map(obj => ({id: obj.id,
        //     title: obj.title, terms: obj.terms, document_path:obj.document_path}));
        //   this.setState({ data: docs })
        //   })
        // .catch(err => console.log(err));
          Axios.post(base_url + 'api/v1/document/', formData, {
            headers : {
                Authorization : `Token ${cookies.get('token')}`,
                'Content-Type':'multipart/form-data',
              }
          })
          .then(response => {
              console.log(response)
              console.log(response.status + " " + response.statusText)
          })
          .catch(error => {
              console.log(error)
          })
          this.clearForm()
      // }

  }

  changeHandler = (event) => {
      event.preventDefault()
          var stateObject = function() {
            var returnObj = {};
            returnObj['display_' + event.target.name] = true;
               return returnObj;
          }();

          this.setState( stateObject );
          this.setState({
              [event.target.name] : event.target.value,
          })
      }

  render() {
      return (
          <div>
              <form onSubmit={this.uploadeDocument} noValidate>
              <div>
                  <label htmlFor="title"> title </label>
                  <input type="text" id="title" name="title" value={this.state.title} onChange={this.changeHandler}  />
              </div>

                  <div>
                      <label htmlFor="document_path"> document_path </label>
                      <input type="file" id="document_path"
                      accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                      name="document_path" onChange={this.handleFileChange}  />
                  </div>

                  <button type='submit'>Uploade</button>
              </form>
          </div>
      )
  }

}

export default UploadeDocument
