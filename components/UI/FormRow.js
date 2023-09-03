const FormRow = (props) => (
  <div className={`mb-4 ${props.className ? props.className : ''}`}>
    {props.children}
  </div>
);

export default FormRow;
