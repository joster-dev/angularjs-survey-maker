// Author  : Jacob Osterhout
// Contact : jacob.osterhout@siemens.com

'use strict';

// Data
var types = [
	{name:"Single Choice"},
	{name:"Multiple Choice"},
	{name:"Rating"},
	{name:"Short Response"},
	{name:"Long Response"}
]

function survey(){
	this.title = "Survey Title"
	this.pages = []
	this.addPage = function(){
		this.pages.push(new page())
	}
	this.removePage = function(index){
		this.pages.splice(index, 1)
	}
}

function page(){
	this.title = "Page Title"
	this.newQuestion = types[0]
	this.questions = []
	this.addQuestion = function(type){
		this.questions.push(new question(type.name))
	}
	this.removeQuestion = function(index){
		this.questions.splice(index, 1)
	}
}

function question(type){
	this.type = type 
	this.content = "Enter a question here"
	this.choices = []
	this.answer = false
	this.addChoice = function(){
		this.choices.push(new choice(""))
	}
	this.removeChoice = function(index){
		this.choices.splice(index, 1)
	}
	this.makeChoice = function(index){
		for(var i = 0; i < this.choices.length; i++)
			this.choices[i].picked = false;
		this.choices[index].picked = true;
		console.log(this.choices)
	}
	if(this.type == types[0].name){
		this.choices.push(new choice("False"))
		this.choices.push(new choice("True"))
	}
	else if(this.type == types[1].name){
		this.choices.push(new choice("Blue"))
		this.choices.push(new choice("Red"))
		this.choices.push(new choice("Green"))
	}
	else if(this.type == types[2].name){
		this.choices.push(new choice("Not Satisfied"))
		this.choices.push(new choice(""))
		this.choices.push(new choice(""))
		this.choices.push(new choice(""))
		this.choices.push(new choice(""))
		this.choices.push(new choice(""))
		this.choices.push(new choice("Very Satisfied"))
	}
	else if(this.type == types[3].name){
		this.shortResponse = ""
	}
	else if(this.type == types[4].name){
		this.longResponse = ""
	}
}

function choice(content){
	this.content = content
	this.answer = false
}

// Angular 
var surveyApp = angular.module('surveyApp', []);

surveyApp.controller('appCtrl', function($scope){
	$scope.session = {
		view1: true,
		view2: false,
		view3: false,
		view4: false,
		viewHeader: true,
		viewFooter: true,
		survey: new survey(),
		hostedSurveys: null
	}

	$scope.types = types;

	$scope.changeViews = function(id){
		$scope.session.view1 = false;
		$scope.session.view2 = false;
		$scope.session.view3 = false;
		switch(id){
			case 1: 	// Survey Maker
				$scope.session.view1 = true;
				$scope.session.viewHeader = true;
				$scope.session.viewFooter = true;
				break;
			case 2: 	// Survey Finder
				$scope.session.view2 = true;
				$scope.session.viewHeader = true;
				$scope.session.viewFooter = false;
				break;
			case 3: 	// Survey Viewer
				$scope.session.view3 = true;
				$scope.session.viewHeader = false;
				$scope.session.viewFooter = true;
				break;
		}
	}

	$scope.newSurvey = function(){
		$scope.session.survey = new survey();
		$scope.changeViews(1);
	}

	$scope.getSurvey = function(){
		// Get
		// $scope.session.upload has file
		console.log("asdasda")
		console.log($scope.session.upload)
	}

	$scope.checkVal = function(){
		console.log($scope.session.survey)
	}

	$scope.saveSurvey = function(){

	}

	$scope.finishSurvey = function(){
		$scope.changeViews(2);
	}
});