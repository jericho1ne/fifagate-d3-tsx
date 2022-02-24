import LocalContext from 'LocalContext';

class LocalProvider extends Component {
  state = {
    currentScheme: 'A',
    currentSchemeDetails: {},
  }

  render() {
    return (
      <LocalContext.Provider 
        value={this.state.currentSchemeDetails}
      >
        {this.props.children}
      </LocalContext.Provider>
    )
  }
}

export default LocalProvider;