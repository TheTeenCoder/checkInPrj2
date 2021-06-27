import React from 'react';
import axios from 'axios'
import QRCode from 'qrcode.react'
import { withRouter } from 'react-router-dom'    


import { FormControl, RadioGroup, Radio, FormControlLabel } from '@material-ui/core'
class Questionaire extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            SoB: 'n',
            Cough: 'n', 
            SoreThroat: 'n',
            StuffyNose: 'n', 
            Fever: 'n', 
            Mucus: 'n',    
            PinkEye: 'n', 
            LoTS: 'n', 
            Diarrhea: 'n',
            ContactLast14: 'n',
            student_id: props.student_id,
            msg: '',
            QR: null,
            STATUS: 0,
            questionaire_id: ''
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    onChange(e){
        this.setState({
           [ e.target.name ]: e.target.value
        })
    }


    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.student_id)
        var healthy = true;
        for(const key in this.state){
            if(this.state[key] === "y"){
                this.setState({
                    msg: 'Sorry. You cannot go to school.'
                })
                healthy = false;
            }
        }

        if(!healthy) return;
        axios.post("https://g5dckfl5sh.execute-api.us-east-2.amazonaws.com/dev/submit-questionair",
        {
            student_id: this.state.student_id,
            answer: JSON.stringify({
                BreathShortness: this.state.SoB,
                Cough: this.state.Cough,
                SoreThroat: this.state.SoreThroat,
                StuffyNose: this.state.StuffyNose,
                MucusPhlegm: this.state.Mucus,
                PinkEye: this.state.PinkEye,
                LossTS: this.state.LoTS,
                Diarrhea: this.state.Diarrhea,
                ContactLast14: this.state.ContactLast14
            })
        })
        .then(res => {
            const body = JSON.parse(res.data.body);
            this.setState({
                STATUS: body.status,
                QR: true,
                questionaire_id: body.questionair_id
            })

            const {history } = this.props;
            history.push(`/userqr/${this.state.questionaire_id}`)
            
        })
    }


    render(){
        
        return (
            <div id="questionaire" className=" flex  flex-col  content-around px-10 py-10  space-y-2 text-left text-xs md:text-xl">
                <p className=" text-red-500">*Fill this in order to get into SLMCS</p>
                <h1 className="">Questionaire.</h1>
                <div id="question-group ">
                    <h1>Have you had any of the following symptoms in the past 14 days not attributed to another health condition?</h1>
                    <table className="table-fixed w-full mt-10 border-2 border-black" >
                        <thead className="border-2 border-black ">
                            <tr>
                                <th>Question</th>
                                <th>Yes</th>
                            </tr>
                        </thead>
                        <tbody className="border-2 border-black">
                            <tr>
                                <td>Shortness of Breath</td>
                                <td>
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="Yes/No" row value={this.state.SoB} onChange={this.onChange} name="SoB">
                                            <FormControlLabel value="y" control={<Radio size="small"/>} label="Y" />
                                            <FormControlLabel value="n" control={<Radio size="small"/>} label="N" />
                                        </RadioGroup>
                                    </FormControl>
                                </td>

                            </tr>
                            <tr>
                                <td>Cough</td>
                                <td>
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="Yes/No" row value={this.state.Cough} onChange={this.onChange} name="Cough">
                                            <FormControlLabel value="y" control={<Radio size="small"/>} label="Y" />
                                            <FormControlLabel value="n" control={<Radio size="small"/>} label="N" />
                                        </RadioGroup>
                                    </FormControl>
                                </td>
    
                            </tr>
                            <tr>
                                <td>Sore Throat</td>
                                <td>
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="Yes/No" row value={this.state.SoreThroat} onChange={this.onChange} name="SoreThroat">
                                            <FormControlLabel value="y" control={<Radio size="small"/>} label="Y" />
                                            <FormControlLabel value="n" control={<Radio size="small"/>} label="N" />
                                        </RadioGroup>
                                    </FormControl>
                                </td>
    
                            </tr>
                            <tr>
                                <td>Stuffy Nose</td>
                                <td>
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="Yes/No" row value={this.state.StuffyNose} onChange={this.onChange} name="StuffyNose">
                                            <FormControlLabel value="y" control={<Radio size="small"/>} label="Y" />
                                            <FormControlLabel value="n" control={<Radio size="small"/>} label="N" />
                                        </RadioGroup>
                                    </FormControl>
                                </td>
    
                            </tr>
                            <tr>
                                <td>Fever/Chills</td>
                                <td>
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="Yes/No" row value={this.state.Fever} onChange={this.onChange} name="Fever">
                                            <FormControlLabel value="y" control={<Radio size="small"/>} label="Y" />
                                            <FormControlLabel value="n" control={<Radio size="small"/>} label="N" />
                                        </RadioGroup>
                                    </FormControl>
                                </td>
                            </tr>
                            <tr>
                                <td>Mucus/Phlegm</td>
                                <td>
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="Yes/No" row value={this.state.Mucus} onChange={this.onChange} name="Mucus">
                                            <FormControlLabel value="y" control={<Radio size="small"/>} label="Y" />
                                            <FormControlLabel value="n" control={<Radio size="small"/>} label="N" />
                                        </RadioGroup>
                                    </FormControl>
                                </td>
                            </tr>
                            <tr>
                                <td>Pink Eye</td>
                                <td>
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="Yes/No" row value={this.state.PinkEye} onChange={this.onChange} name="PinkEye">
                                            <FormControlLabel value="y" control={<Radio size="small"/>} label="Y" />
                                            <FormControlLabel value="n" control={<Radio size="small"/>} label="N" />
                                        </RadioGroup>
                                    </FormControl>
                                </td>
                            </tr>
                            <tr>
                                <td>Loss of Taste/Smell</td>
                                <td>
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="Yes/No" row value={this.state.LoTS} onChange={this.onChange} name="LoTS">
                                            <FormControlLabel value="y" control={<Radio size="small"/>} label="Y" />
                                            <FormControlLabel value="n" control={<Radio size="small"/>} label="N" />
                                        </RadioGroup>
                                    </FormControl>
                                </td>
                            </tr>
                            <tr>
                                <td>Diarrhea</td>
                                <td>
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="Yes/No" row value={this.state.Diarrhea} onChange={this.onChange} name="Diarrhea">
                                            <FormControlLabel value="y" control={<Radio size="small" />} label="Y" />
                                            <FormControlLabel value="n" control={<Radio size="small"/>} label="N" />
                                        </RadioGroup>
                                    </FormControl>
                                </td>
                            </tr>
                            <tr>
                                <td>Contact with someone who has COVID in the last 14 days.</td>
                                <td>
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="Yes/No" row value={this.state.ContactLast14} onChange={this.onChange} name="ContactLast14">
                                            <FormControlLabel value="y" control={<Radio size="small"/>} label="Y" />
                                            <FormControlLabel value="n" control={<Radio size="small"/>} label="N" />
                                        </RadioGroup>
                                    </FormControl>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="mt-5 rounded-md p-2 bg-blue-300 border-2 border-black  w-full" onClick={this.handleSubmit}>Submit.</button>

                </div>
                {this.state.msg ? <label className="text-xl text-red-500">{this.state.msg}</label> : null}
            </div>
        )
    }
    
}
export default withRouter(Questionaire);