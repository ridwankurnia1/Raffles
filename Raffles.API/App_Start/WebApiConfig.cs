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
            container.RegisterType<IActivitiesRepository, ActivitiesRepository>();
            container.RegisterType<IMenuRepository, MenuRepository>();
            container.RegisterType<ITransactionRepository, TransactionRepository>();

            var MapConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<UserProfileDto, User>();
                cfg.CreateMap<User, UserProfileDto>();
                cfg.CreateMap<Activity, ActivityDto>()
                    .ForMember(dest => dest.CreatedUser, opts => opts.MapFrom(src => src.Created.Username))
                    .ForMember(dest => dest.UpdatedUser, opts => opts.MapFrom(src => src.Updated.Username));
                cfg.CreateMap<Categories, CategoryDto>()
                    .ForMember(dest => dest.CreatedUser, opts => opts.MapFrom(src => src.Created.Username))
                    .ForMember(dest => dest.UpdatedUser, opts => opts.MapFrom(src => src.Updated.Username));
                cfg.CreateMap<Menu, MenuDto>()
                    .ForMember(dest => dest.Username, opts => opts.MapFrom(src => src.user.Username));
                cfg.CreateMap<Transaction, TransactionDto>()
                    .ForMember(dest => dest.CreatedUser, opts => opts.MapFrom(src => src.Created.Username))
                    .ForMember(dest => dest.CategoryName, opts => opts.MapFrom(src => src.Category.CategoryName))
                    .ForMember(dest => dest.ActivityName, opts => opts.MapFrom(src => src.Activity.ActivityName))
                    .ForMember(dest => dest.ActivityStart, opts => opts.MapFrom(src => src.Activity.ActivityStart))
                    .ForMember(dest => dest.ActivityEnd, opts => opts.MapFrom(src => src.Activity.ActivityEnd))
                    .ForMember(dest => dest.ActivityStatus, opts => opts.MapFrom(src => src.Activity.Active));                    
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
