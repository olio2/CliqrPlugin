// Generated by CoffeeScript 1.5.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'utils', 'models/question', 'models/questions', 'views/questions_index', 'views/questions_new', 'views/questions_edit', 'views/questions_show'], function(Backbone, utils, Question, QuestionCollection, QuestionsIndexView, QuestionsNewView, QuestionsEditView, QuestionView) {
    var QuestionsRouter;
    return QuestionsRouter = (function(_super) {
      var bootstrapQuestions, loader, timeout;

      __extends(QuestionsRouter, _super);

      function QuestionsRouter() {
        QuestionsRouter.__super__.constructor.apply(this, arguments);
      }

      QuestionsRouter.prototype.routes = {
        "": "index",
        "index": "index",
        "new": "newQuestion",
        "edit-:id": "editQuestion",
        "show-:id": "showQuestion"
      };

      QuestionsRouter.prototype.index = function() {
        var _this = this;
        this.showLoading();
        return this.fetchQuestions().done(function(questions) {
          _this.hideLoading();
          return utils.changeToPage(new QuestionsIndexView({
            collection: questions
          }));
        });
      };

      QuestionsRouter.prototype.newQuestion = function() {
        return utils.changeToPage(new QuestionsNewView);
      };

      QuestionsRouter.prototype.editQuestion = function(id) {
        var _this = this;
        this.showLoading();
        return this.fetchQuestion(id).done(function(question) {
          _this.hideLoading();
          return utils.changeToPage(new QuestionsEditView({
            model: question
          }));
        });
      };

      QuestionsRouter.prototype.showQuestion = function(id) {
        var _this = this;
        this.showLoading();
        return this.fetchQuestion(id).done(function(question) {
          _this.hideLoading();
          return utils.changeToPage(new QuestionView({
            model: question
          }));
        });
      };

      bootstrapQuestions = function() {
        var questions;
        questions = new QuestionCollection(cliqr.bootstrap.POLLS);
        delete cliqr.bootstrap.POLLS;
        return questions;
      };

      QuestionsRouter.prototype.fetchQuestions = function(callback) {
        var questions;
        if (cliqr.bootstrap.POLLS) {
          return jQuery.Deferred().resolve(bootstrapQuestions()).promise();
        } else {
          questions = new QuestionCollection;
          return questions.fetch().pipe(function() {
            return questions;
          });
        }
      };

      QuestionsRouter.prototype.fetchQuestion = function(id, callback) {
        var question;
        if (cliqr.bootstrap.POLLS) {
          return jQuery.Deferred().resolve(bootstrapQuestions().get(id)).promise();
        } else {
          question = new Question({
            id: id
          });
          return question.fetch().pipe(function() {
            return question;
          });
        }
      };

      loader = false;

      timeout = false;

      QuestionsRouter.prototype.showLoading = function() {
        return timeout = setTimeout(function() {
          return loader = jQuery('<span class="cliqr-loader"/>').html("Loading...").prependTo("#layout_container");
        }, 300);
      };

      QuestionsRouter.prototype.hideLoading = function() {
        clearTimeout(timeout);
        if (loader) {
          return loader.remove();
        }
      };

      return QuestionsRouter;

    })(Backbone.Router);
  });

}).call(this);
