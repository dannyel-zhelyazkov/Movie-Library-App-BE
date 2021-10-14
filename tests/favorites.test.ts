process.env.NODE_ENV = 'test';

const { FavoriteModel } = require('../src/models');
const mongoose = require('mongoose');

const chai_module = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src');
const should = chai_module.should();

chai_module.use(chaiHttp);

describe('Favorite', () => {
	let favorites: any = [];

	before((done) => {
		favorites = [];
		FavoriteModel.deleteMany({}, (err: any) => {});
		done();
	});

	describe('/GET favorites', () => {
		it('it should GET all the favorites', (done) => {
			chai_module
				.request(app)
				.get('/favorites?page=1')
				.end((err: any, res: any) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});

	describe('/POST favorite', () => {
		it('it should POST a favorite movie', (done) => {
			chai_module
				.request(app)
				.post('/favorites')
				.send({ id: 123, title: 'test', poster: 'test' })
				.end((err: any, res: any) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('movieId').eql(123);
					favorites.push(res.body);
					done();
				});
		});
	});

	describe('/GET favorites by title', () => {
		it('it should GET all the favorites by title containing "test"', (done) => {
			chai_module
				.request(app)
				.get('/favorites?page=1&title=test')
				.end((err: any, res: any) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.favorites[0].should.have.property('title').eql('test');
					done();
				});
		});
	});

	describe('/POST favorite should send error msg', () => {
		it('it should not POST a favorite movie', (done) => {
			chai_module
				.request(app)
				.post('/favorites')
				.send({ id: 123, title: 323, poster: 'test' })
				.end((err: any, res: any) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have
						.property('error')
						.eql('"title" must be a string');
					done();
				});
		});
	});

	describe('/DELETE/:id favorite', () => {
		it('it should DELETE a favorite movie', (done) => {
			chai_module
				.request(app)
				.delete(`/favorites/${favorites[0].id}`)
				.end((err: any, res: any) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have
						.property('message')
						.eql(
							`Successfully removed favorite movie ${favorites[0].id} from Favorites`,
						);
					done();
				});
		});
	});

	describe('/DELETE/:id favorite should send not found', () => {
		it('it should not DELETE a favorite movie', (done) => {
			chai_module
				.request(app)
				.delete(`/favorites/6167c6c947f7d4cb19e70128`)
				.end((err: any, res: any) => {
					res.should.have.status(404);
					res.body.should.be.a('object');
					res.body.should.have
						.property('error')
						.eql('The movie was not found!');
					done();
				});
		});
	});
});
