import Form from './components/form';
import './variables.scss';

function App() {
  return (
    <div className="App">
      <Form
        onSubmit={data => console.log(data)}
      >
        <div>
          <Form.Input
            id="name"
            placeholder="Name"
          />
        </div>
        <div>
          <Form.Input
            style={{ marginTop: '1rem' }}
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <Form.Input
            style={{ marginTop: '1rem' }}
            id="fullname"
            placeholder="Surname"
            initialValue={['Marc', 'Altmann']}
            path="1"
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          Submit
        </button>
      </Form>
    </div>
  );
}

export default App;
