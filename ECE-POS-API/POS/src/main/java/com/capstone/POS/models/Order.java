package com.capstone.POS.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;


@Entity(name = "order_form")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_created")
    private LocalDate dateCreated;

    @Column(name = "acc_num")
    private Long accountNumber;

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

    @Column(name = "fac_emails")
    private String facultyEmails;

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

    @Column(name = "date_authorized")
    private LocalDate dateAuthorized;

    @Column(name = "date_ordered")
    private LocalDate dateOrdered;

    @Column(name = "date_completed")
    private LocalDate dateCompleted;

    @OneToMany(mappedBy = "orderId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> items = new ArrayList<>();

    // default constructor for JPA
    public Order() {}

    public Order(
        LocalDate dateCreated,
        Long accountNumber,
        LocalDate grantEndDate,
        String requestPerson,
        String phone,
        String email,
        String room,
        String facultyEmails,
        boolean isStandingContract,
        boolean isAuthorized,
        boolean isOrdered,
        boolean isCompleted,
        String tracking,
        BigDecimal shippingTotal,
        BigDecimal totalCost,
        String name,
        String address,
        String url,
        String phoneNumber,
        String faxNumber,
        String contactPerson,
        LocalDate dateAuthorized,
        LocalDate dateOrdered,
        LocalDate dateCompleted
    ) {
        this.dateCreated = dateCreated;
        this.accountNumber = accountNumber;
        this.grantEndDate = grantEndDate;
        this.requestPerson = requestPerson;
        this.phone = phone;
        this.email = email;
        this.room = room;
        this.facultyEmails = facultyEmails;
        this.isStandingContract = isStandingContract;
        this.isAuthorized = isAuthorized;
        this.isOrdered = isOrdered;
        this.isCompleted = isCompleted;
        this.tracking = tracking;
        this.shippingTotal = shippingTotal;
        this.totalCost = totalCost;
        this.name = name;
        this.address = address;
        this.url = url;
        this.phoneNumber = phoneNumber;
        this.faxNumber = faxNumber;
        this.contactPerson = contactPerson;
        this.dateAuthorized = dateAuthorized;
        this.dateOrdered = dateOrdered;
        this.dateCompleted = dateCompleted;
    }

    // getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDateCreated() { return dateCreated; }
    public void setDateCreated(LocalDate dateCreated) { this.dateCreated = dateCreated; }

    public Long getAccountNumber() { return accountNumber; }
    public void setAccountNumber(Long accountNumber) { this.accountNumber = accountNumber; }
    
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

    public String getFacultyEmails() { return facultyEmails; }
    public void setFacultyEmails(String facultyEmails) { this.facultyEmails = facultyEmails; }

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

    public LocalDate getDateAuthorized() { return dateAuthorized; }
    public void setDateAuthorized(LocalDate dateAuthorized) { this.dateAuthorized = dateAuthorized; }

    public LocalDate getDateOrdered() { return dateOrdered; }
    public void setDateOrdered(LocalDate dateOrdered) { this.dateOrdered = dateOrdered; }

    public LocalDate getDateCompleted() { return dateCompleted; }
    public void setDateCompleted(LocalDate dateCompleted) { this.dateCompleted = dateCompleted; }

    public List<Item> getItems() { return items; }
    public void setItems(List<Item> items) { this.items = items; }
}

