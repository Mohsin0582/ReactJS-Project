import React, {Component} from 'react';
import axios from 'axios';
import styles from './stylesheet.module.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ContactPageForm from './contactPageForm.component';

class PhoneBookApp extends Component{
    constructor(props){
        super(props);

        this.state = {
            persons: [],
            name:'', phoneNumber:'',address:'',shortBio:'', customFile:'', 
            loading:false, status:false 
          };

      //this.state={name:'', phoneNumber:'',address:'',shortBio:'' };


          this.contactInformation=this.contactInformation.bind(this);
          
    }

    componentDidMount(){
        axios.get(`http://localhost:3000/contacts`)
          .then(res => {
            const persons = res.data;
            this.setState({ persons, loading:true });
          })
          .catch(function(error){
              console.log(error);
          })
      }

      contactInformation(person){
       this.setState({
           name:person.name,
           phoneNumber:person.phoneNumber,
           address:person.address,
           shortBio:person.shortBio,
           customFile:person.customFile
       });
      }

    render(){
      let data;
        if (!this.state.loading) {
           data= <div class="spinner-border text-secondary" role="status">
  <span class="sr-only">Loading...</span>
</div>
          }
else{
           data= <div>
                <div className="row">
              
                    <div className="col-md-12 col-sm-12 col-md-3 col-lg-3">
                        
                        <span className={styles.phonebookappborder}> Phone Book App</span>
                        
                        <ul className ={ `${styles.contactNames} col-md-12 col-sm-12 col-md-6 col-lg-6 `}>
                            { this.state.persons.map((person) => <li  key={person._id} onClick={()=>this.contactInformation(person)}> {person.name}</li>)}
                        </ul>
                    </div>
                    
                    <div className="col-md-12 col-sm-12 col-md-9 col-lg-9">
                        <span className={styles.phonebookappborder}> Contact Details</span>
                        <div>
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                    <img src={ `../userPics/`+ this.state.customFile} alt="profile" className={styles.imgDimensions} />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <span >Contact Name</span>
                                <br></br>
                                   <input type="text" value={this.state.phoneNumber} />
                                   <br></br>
                                   <br></br>
                                   <input type="text" value={this.state.address} />
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                 <p className="bioData">{this.state.shortBio}</p>
                            </div>
                        </div>
                        
                        <a><Link to={'/ContactPageForm'} id={styles.addNewContact}> Add new contact </Link></a>
                    </div>
                </div>
            </div>
    }
    return(
        <div>
              {data}
         </div>
        )
}
}

export default PhoneBookApp;
