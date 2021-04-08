import React from 'react'
import PaperList from  './paperList'
import { useHistory } from "react-router-dom"

/*
Покупка бумаги 
req = {cert, paperNumber, paperIssue, paperOwner, newOwner, paperCost}
resp = {newPaper}

Погашение бумаги 
req = {cert, paperNumber, }
*/

const ControllPapers = ({user}) => {
    const history = useHistory()
    if(user == null){
        history.replace('/')
    }
    return (
        <div className="controllPapers" >
            <PaperList user={user}/>
        </div>
    )
}

export default ControllPapers