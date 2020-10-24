import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../Navigationitems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/_Aux'

const sideDrawer = (porps) =>{
    let attachedClasses =[classes.SideDrawer, classes.Close];
    if(porps.open){
        attachedClasses=[classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <BackDrop show={porps.open} clicked={porps.closed} open/>
            <div className={attachedClasses.join(' ')}>
               <div className={classes.Logo}>
        <Logo/>
        </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>        
    )
}
export default sideDrawer;