using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Raffles.API.Data;
using Raffles.API.Dto;
using Raffles.API.Models;
using System;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Raffles.API.Controllers
{
    [AllowAnonymous]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AuthController : ApiController
    {
        private readonly IAuthRepository _Repo;
        private readonly IMapper _Mapper;
        
        public AuthController(IAuthRepository repo, IMapper mapper)
        {
            _Repo = repo;
            _Mapper = mapper;
        }
        
        //[Route("auth/Register")]
        //[HttpPost]
        //public async Task<IHttpActionResult> Register(UserRegisterDto userRegister)
        //{
        //    userRegister.Username = userRegister.Username.ToLower();

        //    if (await _Repo.UserExists(userRegister.Username))
        //        return BadRequest("User Id sudah digunakan");

        //    var UserToCreate = _Mapper.Map<User>(userRegister);

        //    var CreatedUser = await _Repo.Register(UserToCreate, userRegister.Password);

        //    return CreatedAtRoute("DefaultApi", new { controller = "Users", id = CreatedUser.Id }, CreatedUser);
        //}

        [Route("auth/login")]
        [HttpPost]
        public async Task<IHttpActionResult> Login(UserLoginDto userLogin)
        {
            var userFromRepo = await _Repo.Login(userLogin.Username.ToLower(), userLogin.Password);

            if (userFromRepo == null)
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Login gagal"));

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(ConfigurationManager.AppSettings["Token"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            //var user = _Mapper.Map<UserForListDto>(userFromRepo);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
                //,user
            });
        }
    }
}
