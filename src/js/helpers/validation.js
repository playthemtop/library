
export const FormSchema = values => {
  const errors = {};

  if (values.phone) {
    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(values.phone)) {
      errors.phone = 'Invalid phone nummber';
    } else if (values.phone.length >= 15) {
      errors.phone = 'Phone must be not more 15 characters';
    }
  }

  if (values.name) {
    if (values.name.length >= 20) {
      errors.name = 'Full Name must be not more 20 characters';
    } else if (values.name.length <= 3) {
      errors.name = 'Full Name must be at least 3 characters';
    }
  }

  if (values.email === '') {
    errors.email = 'Email is required';
  } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
    errors.email = 'Invalid email address';
  } else if (values.email.length >= 50) {
    errors.email = 'Email must be not more 50 characters';
  }

  return { errors };
};
