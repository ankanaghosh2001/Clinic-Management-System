# Clinic Management System
 
## Problem Statement :

Consider a  Clinic Management System. The system keeps information about all the patients visiting the clinic. A patient is treated by a doctor; some of them are associated with the clinic, and others are visiting doctors. Each patient is provided with a prescription and receipt on each visit. The system must store the following info: Personal data about patients and doctors and the treatment history of each patient that includes symptoms, diagnosis, medicines prescribed etc.
- Create a form for the doctors to enter detailed information about the patients' treatment details (symptoms, medicine prescribed, test prescribed etc.) on a specific visit. The master data can be populated directly.
- Generate a report that displays the following information within a specific date range as entered by the end user. The report is sorted date-wise.
  * Visit date
  * Patient name
  * Doctor name
  * Visiting/In-house
  * Payment Mode(online/offline)
  * Medicine Prescribed
  * Tests Suggested

## ERD :
```mermaid
---
title : Clinic Management System
---
erDiagram
  PATIENT ||--|| DOCTOR : consults
  PATIENT{
    string PID PK
    string Pname
  }

  DOCTOR ||--o{ T_HISTORY : is_recorded
  DOCTOR{
    string DID PK
    string Dname
    string Dtype "can be only (In-house/Visiting)"
  }

  PATIENT ||--|{ T_HISTORY : is_recorded
  T_HISTORY{
    string PID FK
    string DID FK
    string Symptom
    string Diagnosis
    string Medicine
    string Test
  }

  PATIENT ||--|{ RECEIPT : has_a
  RECEIPT{
   string PID FK
   string Pmode "can be only (online/offline)"
   date VisitDate
  }

```

