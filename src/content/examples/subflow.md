---
title: Subflow
---
document:
  dsl: '1.0.0-alpha5'
  namespace: test
  name: run-subflow
  version: '0.1.0'
do:
  - registerCustomer:
      run:
        workflow:
          namespace: test
          name: register-customer
          version: '0.1.0'
          input:
            customer: .user