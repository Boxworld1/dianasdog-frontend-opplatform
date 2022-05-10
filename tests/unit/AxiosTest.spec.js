import moxios from 'moxios';
import axios from 'axios';
import request_json from "@/utils/communication";

describe('api GET', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  const myfun = (data) => {
    return data;
  }
  it('GET successed with code 200', async () => {
    moxios.stubRequest('/category', {
      status: 200,
      response: {
        data: "",
      }
    });
    await request_json.GET(myfun, "/category");
  });
  it('GET failed with code 400', async () => {
    moxios.stubRequest('/category', {
      status: 400,
      response: {
        data: "",
      }
    });
    await request_json.GET(myfun, "/category");
  });
});

describe('api GET_WITH_PARAMS', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  const params = {
    resource: "testdata",
  };
  const myfun = (data) => {
    return data;
  }
  it('GET_WITH_PARAMS successed with code 200', async () => {
    moxios.stubRequest('/dataname?resource=testdata', {
      status: 200,
      response: {
        data: "",
      }
    });
    await request_json.GET_WITH_PARAMS(myfun, "/dataname", params);
  });
  it('GET_WITH_PARAMS failed with code 400', async () => {
    moxios.stubRequest('/dataname?resource=testdata', {
      status: 400,
      response: {
        data: "",
      }
    });
    await request_json.GET_WITH_PARAMS(myfun, "/dataname", params);
  });
});

describe('api POST', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  const params = {
    query: "testdata",
  };
  const myfun = (data) => {
    return data;
  }
  it('GET_WITH_PARAMS successed with code 200', async () => {
    moxios.stubRequest('/query', {
      status: 200,
      response: {
        data: "",
      }
    });

    await request_json.POST(
      myfun, params, "/query"
    );
  });
  it('GET_WITH_PARAMS successed with code 201', async () => {
    moxios.stubRequest('/query', {
      status: 201,
      response: {
        data: "",
      }
    });
    await request_json.POST(
      myfun, params, "/query"
    );
  });
  it('GET_WITH_PARAMS failed with code 400', async () => {
    moxios.stubRequest('/query', {
      status: 400,
      response: {
        data: "",
      }
    });
    await request_json.POST(
      myfun, params, "/query"
    );
  });
});

describe('api POST_Userlevel', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  const params = {
    query: "testdata",
  };
  const myfun = (data) => {
    return data;
  }
  it('successed with code 200', async () => {
    moxios.stubRequest('/login', {
      status: 200,
      data: {
        userlevel: '3254'
      }
    });
    await request_json.POST_Userlevel(myfun, params)
  });

  it('successed with code 201', async () => {
    moxios.stubRequest('/login', {
      status: 201,
      data: {
        userlevel: '3254'
      }
    });
    await request_json.POST_Userlevel(myfun, params)
  });

  it('failed with code 400', async () => {
    moxios.stubRequest('/login', {
      status: 400,
      data: {
        userlevel: '3254'
      }
    });
    await request_json.POST_Userlevel(myfun, params)
  });
});

describe('api POST_User', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  const params = {
    query: "testdata",
  };
  const myfun = (data) => {
    return data;
  }
  it('successed with code 200', async () => {
    moxios.stubRequest('/login', {
      status: 200,
      data: {
        password: '3254'
      }
    });
    await request_json.POST_User(myfun, params)
  });

  it('successed with code 201', async () => {
    moxios.stubRequest('/login', {
      status: 201,
      data: {
        password: '3254'
      }
    });
    await request_json.POST_User(myfun, params)
  });

  it('failed with code 400', async () => {
    moxios.stubRequest('/login', {
      status: 400,
      data: {
        password: '3254'
      }
    });
    await request_json.POST_User(myfun, params)
  });
});

describe('api POST_File', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  const params = {
    query: "testdata",
  };
  const myfun = (data) => {
    return data;
  }
  it('successed with code 200', async () => {
    moxios.stubRequest('/data', {
      status: 200,
    });
    await request_json.POST_File(myfun, params, "/data")
  });
  it('successed with code 201', async () => {
    moxios.stubRequest('/data', {
      status: 201,
    });
    await request_json.POST_File(myfun, params, "/data")
  });
  it('failed with code 400', async () => {
    moxios.stubRequest('/data', {
      status: 400,
    });
    await request_json.POST_File(myfun, params, "/data")
  });
});