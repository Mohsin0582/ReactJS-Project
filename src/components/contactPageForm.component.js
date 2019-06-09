import React, {Component} from 'react';
import axios from 'axios';
import styles from './stylesheet.module.css'

class ContactPageForm extends Component{
    constructor(props){
        super(props);

        this.state={
            name: '',
            phoneNumber:'',
            address:'',
            gender:'',
            shortBio: '',
            customFile:'',
            nameError:'',
            phoneError:'',
            addressError:'',
            bioError:'',
            customFileError:'',
            hasError:false
        }

        this.onClickName=this.onClickName.bind(this);
        this.onClickPhoneNumber=this.onClickPhoneNumber.bind(this);
        this.onClickAddress=this.onClickAddress.bind(this);
        this.onClickGender=this.onClickGender.bind(this);
        this.onClickShortBio=this.onClickShortBio.bind(this);
        this.onClickPic=this.onClickPic.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    

    onClickName(e){
        if(e.target.value.match(/^[a-zA-Z]*$/) && (e.target.value.length>3 || e.target.value.length==0)){
            this.setState({name: e.target.value, nameError:'', hasError:false});
        }else{
            this.setState({nameError:"Should be more than 3 characters with no special characters!", name: e.target.value, hasError:true});
        }
    }
    onClickPhoneNumber(e){
        if(e.target.value.match(/^[(][0-9]{3}[)][ ]?([0-9]{3})[ ]?([0-9]{4})$/) ){
            this.setState({phoneNumber: e.target.value, phoneError:'', hasError:false});
        }else{
            this.setState({phoneError:"Should be in the format (301) 000 0000!", phoneNumber: e.target.value, hasError:true});
        }
    }
    onClickAddress(e){
        if((((e.target.value.length>3) && (e.target.value.length <= 200)) || e.target.value.length==0)){
            this.setState({address: e.target.value, addressError:'', hasError:false});
        }else{
            this.setState({addressError:"Should be more than 3 characters but less than 200 char!", address: e.target.value, hasError:true});
        }
    }
    onClickShortBio(e){
        if((((e.target.value.length>10) && (e.target.value.length <= 1000)) || e.target.value.length==0)){
            this.setState({shortBio: e.target.value, bioError:'', hasError:false});
        }else{
            this.setState({bioError:"Should be more than 10 characters but less than 1000 char!", shortBio: e.target.value, hasError:true});
        }
    }
    onClickGender(e){
        this.setState({
            gender: e.target.value
        });
    }

    onClickPic(e){
    
        let allowedExtension = ['png', 'jpg'];
        let fileExtension = e.target.value.split('.').pop().toLowerCase();
        let isValidFile = false;

        for(let index in allowedExtension) {

            if(fileExtension === allowedExtension[index]) {
                isValidFile = true; 
                this.setState({customFileError:'', customFile:e.target.files[0].name, hasError:false});
                break;
            }
        }

        let fileError='';
        if(!isValidFile) {
             fileError = ('Allowed Extensions are : *.' + allowedExtension.join(', *.') +'. ' );
            this.setState({customFileError:fileError, hasError:true});
        }

        let fi = e.target.files[0].name; // GET THE FILE INPUT.
        let FileSize = e.target.files[0].size / 1024; // in KB
        if (FileSize > 200) {
            this.setState({customFileError:fileError +  'File size exceeds 200 KB', hasError:true});
        }
        else{
            this.setState({customFileError:'', customFile:e.target.files[0].name, hasError:false});
        }
    }
    

    onSubmit(e){
        e.preventDefault();        

        const newContactInformation={
            name: this.state.name,
            phoneNumber:this.state.phoneNumber,
            address:this.state.address,
            gender:this.state.gender,
            shortBio: this.state.shortBio,
            customFile:this.state.customFile
        }
        
            axios.post('http://localhost:3000/contacts', newContactInformation)
            .then( res => console.log(res.data))
            .catch(function(error){ console.log(error)});
        

        this.setState({
            name: '',
            phoneNumber:'',
            address:'',
            gender:'',
            shortBio: '',
            customFile:''
        });

        
    }

    canBeSubmitted() {
        const { name, phoneNumber, address, shortBio } = this.state;
        return (name.length > 3) && (phoneNumber.length > 0) && (address.length > 3 && shortBio.length < 200)  && (shortBio.length > 10 && shortBio.length < 1000);
      }

    render(){
        if(this.state.hasError==false){
        const isEnabled = this.canBeSubmitted();
        return(
            <div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                        <h5> Add New Contact</h5>
                    </div>
                    <br></br>
                        <form className="form-inline" action="/contacts" method="post" onSubmit={this.onSubmit} enctype="multipart/form-data" >
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <br></br>
                                    <input type="text" className="form-control" value={this.state.name} onChange={this.onClickName} name="name" required />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone Number:</label>
                                    <br></br>
                                    <input type="text" className="form-control"  value={this.state.phoneNumber} onChange={this.onClickPhoneNumber} name="phoneNumber" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address:</label>
                                    <br></br>
                                    <input type="text" className="form-control" value={this.state.address} onChange={this.onClickAddress} name="address" required />
                                </div>
                                <div className="form-group">
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label"><input type="radio" id="male" value="Male" checked={this.state.gender==='Male'} onChange={this.onClickGender} name="gender" required />Male</label>
                                        <label className="form-check-label"><input type="radio" id="female" value="Female" checked={this.state.gender==='Female'} onChange={this.onClickGender} name="gender" />Female</label>                                        
                                    </div>
                                </div> 
                                <div className="form-group">
                                    <label htmlFor="shortBio">Short Bio:</label>
                                    <br></br>
                                    <textarea className="form-control" value={this.state.shortBio} onChange={this.onClickShortBio} name="shortBio" required ></textarea> 
                                </div>
                                
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                               
                            <div className="custom-file mb-3">
                                <input type="file" className="custom-file-input" id={styles.customFile}  onChange={this.onClickPic} name="avatar" required />
                                <label className="custom-file-label" htmlFor="customFile">Add Photo</label>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary" value="ADD" disabled={!isEnabled}/>
                            </div>
                            </div>
                        </form>
                </div>
            </div>
        )
        }
        else{
            const isEnabled = this.canBeSubmitted();
            return(
                <div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                            <h5> Add New Contact</h5>
                        </div>
                        <br></br>
                            <form className="form-inline" action="" onSubmit={this.onSubmit} enctype="multipart/form-data">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <br></br>
                                        <input type="text" className="form-control" id={styles.name} value={this.state.name} onChange={this.onClickName} name="name" required />
                                        <h6 id={styles.nameError}>{this.state.nameError}</h6>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Phone Number:</label>
                                        <br></br>
                                        <input type="text" className="form-control" id={styles.phone} value={this.state.phoneNumber} onChange={this.onClickPhoneNumber} name="phoneNumber" required />
                                        <h6 id={styles.phoneError}>{this.state.phoneError}</h6>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address:</label>
                                        <br></br>
                                        <input type="text" className="form-control" id={styles.address} value={this.state.address} onChange={this.onClickAddress} name="address"  required/>
                                        <h6 id={styles.addressError}>{this.state.addressError}</h6>
                                    </div>
                                    <div className="form-group">
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label"><input type="radio" id="male" value="Male" checked={this.state.gender==='Male'} onChange={this.onClickGender} name="gender" required/>Male</label>
                                        <label className="form-check-label"><input type="radio" id="female" value="Female" checked={this.state.gender==='Female'} onChange={this.onClickGender} name="gender" />Female</label>                                        
                                    </div>
                                </div>
                                    <div className="form-group">
                                        <label htmlFor="shortBio">Short Bio:</label>
                                        <br></br>
                                        <textarea className="form-control" id={styles.shortBio} value={this.state.shortBio} onChange={this.onClickShortBio} name="shortBio" required ></textarea> 
                                        <h6 id={styles.bioError}>{this.state.bioError}</h6>
                                    </div>
                                    
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                   
                                <div>   
                                <div className="custom-file mb-3">
                                    <input type="file" className="custom-file-input" id={styles.customFile} onChange={this.onClickPic} name="avatar" required />
                                    <label className="custom-file-label" htmlFor="customFile">Add Photo</label>
                                </div>
                                <h6 id={styles.customFileError}>{this.state.customFileError}</h6>
                                </div>

                                <div className="form-group">
                                    <input type="submit" className="btn btn-primary" value="ADD" disabled={!isEnabled} />
                                </div>
                                </div>
                            </form>
                    </div>
                </div>
            )
        }
    }
}

export default ContactPageForm;
