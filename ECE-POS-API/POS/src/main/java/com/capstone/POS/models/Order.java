package com.capstone.POS.models;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;


@Entity(name = "order_form")
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "acc_num")
    private String accountNumber;

    @Column(name = "grant_end_date")
    private LocalDate grantEndDate;

    @Column(name = "req_person")
    private String requestPerson;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "room")
    private String room;

    @Column(name = "fac_email_1")
    private String facilityEmail1;

    @Column(name = "fac_email_2")
    private String facilityEmail2;

    @Column(name = "is_standing_contract")
    private Boolean isStandingContract;

    @Column(name = "is_auth")
    private Boolean isAuthorized;

    @Column(name = "is_ordered")
    private Boolean isOrdered;

    @Column(name = "is_completed")
    private Boolean isCompleted;

    @Column(name = "tracking")
    private String tracking;

    @Column(name = "ship_total")
    private BigDecimal shippingTotal;

    @Column(name = "total_cost")
    private BigDecimal totalCost;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "url")
    private String url;

    @Column(name = "phone_num")
    private String phoneNumber;

    @Column(name = "fax_num")
    private String faxNumber;

    @Column(name = "contact_person")
    private String contactPerson;

    // default constructor for JPA
    public Order() {}


    // getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    
    public LocalDate getGrantEndDate() { return grantEndDate;}
    public void setGrantEndDate(LocalDate grantEndDate) { this.grantEndDate = grantEndDate; }

    public String getRequestPerson() { return requestPerson; }
    public void setRequestPerson(String requestPerson) { this.requestPerson = requestPerson; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRoom() { return room; }
    public void setRoom(String room) { this.room = room; }

    public String getFacilityEmail1() { return facilityEmail1; }
    public void setFacilityEmail1(String facilityEmail1) { this.facilityEmail1 = facilityEmail1; }

    public String getFacilityEmail2() { return facilityEmail2; }
    public void setFacilityEmail2(String facilityEmail2) { this.facilityEmail2 = facilityEmail2; }

    public Boolean getIsStandingContract() { return isStandingContract; }
    public void setIsStandingContract(Boolean isStandingContract) { this.isStandingContract = isStandingContract; }

    public Boolean getIsAuthorized() { return isAuthorized; }
    public void setIsAuthorized(Boolean isAuthorized) { this.isAuthorized = isAuthorized; }

    public Boolean getIsOrdered() { return isOrdered; }
    public void setIsOrdered(Boolean isOrdered) { this.isOrdered = isOrdered; }

    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }

    public String getTracking() { return tracking; }
    public void setTracking(String tracking) { this.tracking = tracking; }

    public BigDecimal getShippingTotal() { return shippingTotal; }
    public void setShippingTotal(BigDecimal shippingTotal) { this.shippingTotal = shippingTotal; }

    public BigDecimal getTotalCost() { return totalCost; }
    public void setTotalCost(BigDecimal totalCost) { this.totalCost = totalCost; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getFaxNumber() { return faxNumber; }
    public void setFaxNumber(String faxNumber) { this.faxNumber = faxNumber; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

}
