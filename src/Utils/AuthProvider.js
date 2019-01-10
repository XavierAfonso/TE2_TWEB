import React, { Component } from 'react';
import axios from 'axios';

const { 
    Provider : AuthContextProvider, 
    Consumer : AuthContext,
 } = React.createContext();

class AuthProvider extends Component {
  
  constructor(props){
      super(props);

          this.state = {

            user:null,
            error:null,
            signIn:this.signIn,
            signUp:this.signUp,
            signOut:this.signOut,
          }
    }

    // Check if a token already exist, if so get the username
    componentWillMount () {

        /*const token = window.localStorage.getItem('token');
        if(token){
            
            axios.get(`/api/me`, {
                headers : {
                    Authorization : `bearer ${token}`,
                }

            }).then(response => {
                const { user } = response.data;
                console.log(user);
                this.setState({user});
            }).catch(err => {
                console.error(err);
                window.localStorage.removeItem('token');
            })
        }*/

        const token = window.localStorage.getItem('token');

        if(token){
            this.setState({user : 'admin'});
        }
    }

    // Check the error
    getError = (error) => {

        if(error===400){
            this.setState({error: '400 The email already exist'});
        }
        else if(error===500){
            this.setState({error: '500 Server error'});
        }
        else if (error===403){
            this.setState({error: '403 forbidden'});
        }
        else{
            this.setState({error: 'Invalid username or password'});
        }
    }

    // Login
    signIn = ({username,password}) =>{

        /*this.setState({error : ""});

        axios.post(`/auth/login`,{username,password}).then(response => {

            console.log(response);
            const {user, token} = response.data;
            window.localStorage.setItem('token',token);

            console.log( {user, token} );
            this.setState({user: username});
            
        }).catch(error => {
            this.getError(error);
        });*/

        if(username ==="admin" && password ==="admin"){
            window.localStorage.setItem('token',"fakeToken");
            this.setState({user: "admin"});
        }
        else{
            this.getError("500");
        }
    }

    // Register
    signUp = (username,password) =>{

       
       /* this.setState({error : ""});
       return axios.post(`/auth/register`,{username,password}).then(response => {
            
        }).catch((error) => {
            this.getError(error);
            throw error;
        });*/

    }

    // Logout
    signOut = () => {
       
       /* console.log("LOGOUT")*/
        window.localStorage.removeItem('token');
        this.setState({user : null})
    }

    
    render() {

        const { children } = this.props;
        return (
            <AuthContextProvider value={this.state}>
                {children}
            </AuthContextProvider>
        )
  }
}

export { AuthContext };
export default AuthProvider;
