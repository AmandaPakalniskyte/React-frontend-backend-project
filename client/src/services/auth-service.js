const domain = process.env.REACT_APP_SERVER_ADDRESS;

const login = async (credentials) => {
  const response = await fetch(`${domain}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const authData = await response.json();

  if (response.status >= 400) {
    throw new Error(authData.message);
  }

  return authData;
};

const auth = async (token) => {
  const response = await fetch(`${domain}/auth/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const authData = await response.json();

  if (response.status >= 400) {
    throw new Error(authData.message);
  }

  return authData;
};

const checkEmail = async (email) => {
  const response = await fetch(`${domain}/auth/check-email`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ email }),
  });
  const responseData = await response.json();

  if (response.status >= 400) {
    throw new Error(responseData.message);
  }

  return responseData.emailAvailable;
};

const updateProfile = async ({ formData, token }) => {
  const response = await fetch(`${domain}/auth/update-profile`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: formData,
  });
  const authData = await response.json();

  if (response.status >= 400) {
    throw new Error(authData.message);
  }

  return authData;
};

const AuthService = {
  auth,
  login,
  checkEmail,
  updateProfile,
};

export default AuthService;
