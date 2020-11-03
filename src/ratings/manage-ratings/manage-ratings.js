import React from "react";
import Modal from "react-modal";
import Loading from "../../shared/loading/loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { customStyles } from "../../shared/custom-modal";
import {
  fetchCurrentUserRatings,
  removeRating,
} from "../../shared/rating.service";

class ManageRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: null,
      selectedRatingId: null,
      modalIsOpen: false,
      loading: true,
      submitting: false,
      success: false,
      error: null,
    };

    this.fetchRatings = this.fetchRatings.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeRating = this.removeRating.bind(this);
    this.handleError = this.handleError.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    var token = localStorage.getItem("token");
    this.fetchRatings(token);
  }

  fetchRatings(token) {
    fetchCurrentUserRatings(token)
      .then((response) => {
        this.setState({
          ratings: response,
          loading: false,
        });
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      submitting: true,
      success: false,
      error: null,
    });

    var token = localStorage.getItem("token");
    this.removeRating(this.state.selectedRatingId, token);
  }

  removeRating(ratingId, token) {
    removeRating(ratingId, token)
      .then((response) => {
        var oldRating = this.state.ratings.find((b) => b.id === response.id);
        var index = this.state.ratings.indexOf(oldRating);
        this.state.ratings.splice(index, 1);
        this.setState({
          modalIsOpen: false,
          submitting: false,
          success: true,
          selectedRatingId: null,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  handleError(error) {
    this.setState({
      error: error,
      modalIsOpen: false,
      loading: false,
      submitting: false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  openModal(id) {
    this.setState({
      selectedRatingId: id,
      modalIsOpen: true,
      success: false,
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div className="column is-8 is-offset-2 form-container">
        <Helmet>
          <title>Manage Ratings - Bookshelf</title>
        </Helmet>
        <div className="card form-card">
          <div className="card-content">
            <div className="media">
              <div className="image-header-container">
                <FontAwesomeIcon icon={faEye} className="eye-icon" size="lg" />
              </div>
            </div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
            >
              <form onSubmit={this.handleSubmit}>
                <div>Are you sure you would like to delete this rating?</div>
                <div className="modal-actions">
                  <button
                    className={
                      this.state.submitting
                        ? "button is-link is-loading"
                        : "button is-link"
                    }
                    type="submit"
                  >
                    Confirm
                  </button>
                  <button
                    id="cancel"
                    className="button"
                    onClick={this.closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
            <div>
              {this.state.success &&
                this.state.ratings &&
                this.state.ratings.length && (
                  <div className="notification is-success">
                    Successfully removed entry.
                  </div>
                )}
              {this.state.error && (
                <div className="notification is-danger">{this.state.error}</div>
              )}
              <div style={{ marginBottom: "25px" }}>
                <Link to={"/rating-form"}>
                  <button className="button is-outlined">
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                  </button>
                </Link>
              </div>
              {!this.state.ratings || !this.state.ratings.length ? (
                <div className="notification is-link">
                  No ratings to display.
                </div>
              ) : (
                <div className="form-table">
                  <table className="table is-fullwidth is-bordered">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Code</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.ratings.map((rating) => (
                        <tr key={rating.id}>
                          <td>{rating.description}</td>
                          <td>{rating.code}</td>
                          <td className="has-text-centered">
                            <Link to={"/rating-form/" + rating.id}>
                              <button
                                className="button is-outlined"
                                disabled={this.state.submitting}
                              >
                                Edit
                              </button>
                            </Link>
                          </td>
                          <td className="has-text-centered">
                            <button
                              onClick={() => this.openModal(rating.id)}
                              className="button is-outlined"
                              disabled={this.state.submitting}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageRatings;