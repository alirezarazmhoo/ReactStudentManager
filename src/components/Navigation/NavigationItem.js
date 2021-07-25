
import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './Navigation.css';
import lstudents from '../../screens/Students';
import lteachers from '../../screens/Teachers';


class NavigationItem extends Component {
  render(){
    return (
                  <div className="Blog">
        <header>
                    <nav>
                        <ul>
                    
                        
                            <li><NavLink to="/src/screens/Students"
                               
                            
                            > دانش آموزان</NavLink></li>
                             <li><NavLink to="/src/screens/Teachers"
                            
                            > معلمان</NavLink></li>
                        </ul>
                    </nav>
                </header>
                 <Switch>
                     <Route path="/src/screens/Students" component={lstudents}  />
                    <Route path="/src/screens/Teachers" component={lteachers} /> 

                </Switch>
                </div>
    )
  }
}
export default NavigationItem;