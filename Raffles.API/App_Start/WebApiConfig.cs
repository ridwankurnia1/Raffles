using AutoMapper;
using Raffles.API.Controllers;
using Raffles.API.Data;
using Raffles.API.Dto;
using Raffles.API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;
using Unity;
using Unity.Injection;

namespace Raffles.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var container = new UnityContainer();            
            container.RegisterType<IAuthRepository, AuthRepository>();
            container.RegisterType<IUserRepository, UserRepository>();
            container.RegisterType<ICategoriesRepository, CategoriesRepository>();

            var MapConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<UserProfileDto, User>();   
            });

            IMapper mapper = MapConfig.CreateMapper();
            container.RegisterInstance(mapper);

            config.DependencyResolver = new UnityResolver(container);
            

            // Web API configuration and services
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.EnableCors();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
