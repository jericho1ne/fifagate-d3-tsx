import LocalContext from 'LocalContext';



class LocalProvider extends Component {
  state = {
    currentSchemeLetter: 'A',
    currentSchemeDetails: {},
  }

  render() {
    return (
      <LocalContext.Provider 
        value={{scheme: this.state.currentSchemeDetails}}
      >
        {this.props.children}
      </LocalContext.Provider>
    )
  }
}

export default LocalProvider;