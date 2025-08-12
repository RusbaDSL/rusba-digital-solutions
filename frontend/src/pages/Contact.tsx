import React, { useState } from 'react';
import { motion } from 'framer-motion';
import config from '../config';
import './Contact.css';

interface ContactForm {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<ContactForm>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const response = await fetch(`${config.apiUrl}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                setSubmitMessage(result.message || 'Thank you for your message! We will get back to you soon.');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                setSubmitMessage(result.message || 'Sorry, there was an error sending your message. Please try again.');
            }
        } catch (error) {
            setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-container">
            <motion.h1 
                className="contact-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Contact Us
            </motion.h1>

            <motion.div 
                className="contact-intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <p>
                    Ready to transform your business with cutting-edge technology solutions? 
                    Get in touch with our team of experts today. We're here to help you 
                    achieve your digital goals and drive your business forward.
                </p>
            </motion.div>

            <div className="contact-content">
                <motion.section 
                    className="contact-info glass-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2>Get In Touch</h2>
                    
                    <div className="contact-item">
                        <i className="material-icons">location_on</i>
                        <div>
                            <h3>Address</h3>
                            <p>8 Peacee Avenue, Rumuigbo New Layout <br /> Port Harcourt, Rivers State, Nigeria</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <i className="material-icons">phone</i>
                        <div>
                            <h3>Phone</h3>
                            <p>+234 803 338 0055 <br /> +234 805 126 4318 </p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <i className="material-icons">email</i>
                        <div>
                            <h3>Email</h3>
                            <p>contact@rusbadsl.com.ng</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <i className="material-icons">access_time</i>
                        <div>
                            <h3>Business Hours</h3>
                            <p>Monday - Friday: 8:00 AM - 6:00 PM<br />
                               Saturday: 9:00 AM - 2:00 PM<br />
                               Sunday: Closed</p>
                        </div>
                    </div>

                    <div className="social-links">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <a href="https://linkedin.com/company/rusba-digital-solutions" className="social-icon" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="https://twitter.com/rusbadigital" className="social-icon" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://facebook.com/rusbadigital" className="social-icon" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="https://instagram.com/rusbadigital" className="social-icon" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </motion.section>

                <motion.section 
                    className="contact-form-section glass-card"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2>Send Us a Message</h2>
                    
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email address"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject *</label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a subject</option>
                                <option value="general">General Inquiry</option>
                                <option value="services">Services</option>
                                <option value="products">Products</option>
                                <option value="support">Technical Support</option>
                                <option value="partnership">Partnership</option>
                                <option value="quote">Request a Quote</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                placeholder="Tell us about your project or inquiry..."
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="submit-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="material-icons spinning">refresh</i>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <i className="material-icons">send</i>
                                    Send Message
                                </>
                            )}
                        </button>

                        {submitMessage && (
                            <motion.div 
                                className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {submitMessage}
                            </motion.div>
                        )}
                    </form>
                </motion.section>
            </div>

            <motion.section 
                className="map-section glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <h2>Find Us</h2>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.5743162562414!2d6.972547314770373!3d4.858251096611588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNTEnMjkuNyJOIDfCsDU4JzI5LjEiRQ!5e0!3m2!1sen!2sng!4v1625097600000!5m2!1sen!2sng"
                        width="100%"
                        height="400"
                        style={{ border: 0, borderRadius: '12px' }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Rusba Digital Solutions Location"
                    ></iframe>
                </div>
            </motion.section>
        </div>
    );
};

export default Contact;
