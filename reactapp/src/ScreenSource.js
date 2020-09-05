import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

const API_KEY = process.env.REACT_APP_API_KEY;

function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([])
  const [selectedLang, setSelectedLang] = useState(props.selectedLang)
  const [backgroundColorFr, setBackgroundColorFr] = useState('')
  const [backgroundColorUk, setBackgroundColorUk] = useState('')

  useEffect(() => {
    const initialPage = async() => {
      if(props.selectedLang == 'fr'){
        var langueInit = 'fr'
        var countryInit = 'fr'
        setBackgroundColorFr('black')
        setBackgroundColorUk('')
      } else{
        var langueInit = 'en'
        var countryInit = 'us'
        setBackgroundColorFr('')
        setBackgroundColorUk('black')
      }
      const data = await fetch(`https://newsapi.org/v2/sources?language=${langueInit}&country=${countryInit}&apiKey=${API_KEY}`)
      const body = await data.json()
      setSourceList(body.sources)
    }
    initialPage();
  }, []);

  useEffect(() => {
    const APIResultsLoading = async() => {
      var langue = 'fr'
      var country = 'fr'
        
      if(selectedLang == 'en'){
        var langue = 'en'
        var country = 'us'
      }
      props.changeLang(selectedLang)
      const data = await fetch(`https://newsapi.org/v2/sources?language=${langue}&country=${country}&apiKey=${API_KEY}`)
      const body = await data.json()
      setSourceList(body.sources)
    }

    const fetchLanguage = async() => {
      const userChoice = await fetch('/language', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `language=${props.selectedLang}&token=${props.token}`
      });
      const userChoiceClean = await userChoice.json()
    }
    
    APIResultsLoading()
    fetchLanguage()

  }, [selectedLang])

  return (
    <div>
        <Nav/>
       
       <div style={{display:'flex', justifyContent:'center', alignItems:'center'}} className="Banner">
          <img style={{width:'40px', margin:'10px',cursor:'pointer', backgroundColor:`${backgroundColorFr}`}} src='/images/fr.png' onClick={() => setSelectedLang('fr')} />
          <img style={{width:'40px', margin:'10px',cursor:'pointer', backgroundColor:`${backgroundColorUk}`}} src='/images/uk.png' onClick={() => setSelectedLang('en')} /> 
        </div>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={source => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${source.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${source.id}`}>{source.name}</Link>}
                        description={source.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

function mapStateToProps(state){
  return {selectedLang: state.selectedLang, token:state.token}
}

function mapDispatchToProps(dispatch){
  return {
    changeLang: function(selectedLang){
      dispatch({type: 'changeLang', selectedLang: selectedLang})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource)
