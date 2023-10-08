using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Interfaces;
using API.Interfaces;

namespace API.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext context;
        public UnitOfWork(DataContext _context){
            context = _context;

        }
        public ICityrepository CityRepository => new CityRepository(context);

        public IUserRepository UserRepository => new UserRepository(context);

        public IPropertyrepository PropertyRepository =>  new PropertyRepository(context);

        public async Task<bool> SaveAsync()
        {
            return await context.SaveChangesAsync()>0;
        }
    }
}